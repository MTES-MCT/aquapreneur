import { wrapServerRouteWithSentry } from "@sentry/sveltekit";
import assert from "assert";
import { eq } from "drizzle-orm";

import { error, isHttpError } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { evtsJournalReqs } from "$lib/server/db/schema/api";
import { type EvtJournalReqs } from "$lib/server/db/types";
import { getJetonApiFromToken } from "$lib/server/db/utils";
import audit from "$lib/server/utils/audit";
import { createBilanEntry } from "$lib/server/utils/convert-bilan";
import * as logger from "$lib/server/utils/logger";
import { getOrCreateEtablissement } from "$lib/server/utils/sirene";

// TODO : utiliser un algorithme de vérification plus complet, et tester la validité
// directement dans le type Zod
const siretIsValid = (siret: string | undefined): siret is string =>
	!!(siret && siret.match(/^\d{14}$/));

const getApiVersion = (url: URL): number => {
	// Les appels api sont de la forme /api/v12/<...>
	// Dans cet exemple, On veut extraire le `12`

	const matches = url.pathname.match(/^\/api\/v(\d+)\//);
	if (matches?.length) {
		return Number(matches[1]);
	}
	error(500, "URL incorrecte");
};

const setLogEntryStatus = async (logEntry: EvtJournalReqs, statut: number) => {
	await db
		.update(evtsJournalReqs)
		.set({ statut })
		.where(eq(evtsJournalReqs.id, logEntry.id));
};

const auth = async (request: Request) => {
	const bearerToken = request.headers.get("Authorization");
	if (!bearerToken) {
		audit("Jeton manquant");

		error(401, "En-tête `Authorization` absent");
	}

	if (!bearerToken.startsWith("Bearer ")) {
		audit("En-tête `Authorization` incorrect");

		error(
			400,
			"En-tête `Authorization` incorrect. La valeur attendue est : `Bearer <YOUR TOKEN>`",
		);
	}

	const key = bearerToken.split(" ")[1];
	if (!key) {
		audit("En-tête `Authorization` incorrect");

		error(
			400,
			"En-tête `Authorization` incorrect. La valeur attendue est : `Bearer <YOUR TOKEN>`",
		);
	}

	const jeton = await getJetonApiFromToken(key);

	if (!jeton) {
		audit("Utilisation d’un jeton invalide");

		error(401, "Jeton d’authentification invalide");
	}

	if (!jeton.valide) {
		audit("Utilisation d’un jeton désactivé");

		error(401, "Jeton d’authentification désactivé");
	}
	return jeton.id;
};

const parseRequest = async (
	url: URL,
	request: Request,
	jetonId: number,
	apiVersion: number,
) => {
	let bilanData;
	try {
		bilanData = await request.json();
	} catch (err) {
		logger.exception(err, "Error de lecture du JSON", {
			api_token_id: jetonId,
		});
		// TODO ajouter une requête d’audit ?
		error(400, "Contenu JSON invalide");
	}

	// Sauvegarde de la requête pour audit

	const auditLogEntries = await db
		.insert(evtsJournalReqs)
		.values({
			idJeton: jetonId,
			versionApi: apiVersion,
			href: url.href,
			pathname: url.pathname,
			methode: request.method,
			donnees: bilanData,
		})
		.returning();
	assert(auditLogEntries.length == 1);
	const auditLogEntry = auditLogEntries[0];

	audit("Requête d’audit sauvegardée", {
		request_log_id: auditLogEntry.id,
		api_token_id: jetonId,
	});

	return { auditLogEntry, bilanData };
};

const createBilan = async (auditLogEntry: EvtJournalReqs, jetonId: number) => {
	let bilanId;
	// Parsing du bilan, et écriture en BDD
	try {
		bilanId = await createBilanEntry(auditLogEntry);
	} catch (err) {
		if (err instanceof Error) {
			error(400, err.message);
		} else {
			error(500, "Erreur inconnue");
		}
	}

	await setLogEntryStatus(auditLogEntry, 204);

	audit("Envoi de bilan réussi", {
		request_log_id: auditLogEntry.id,
		bilan_id: bilanId,
		api_token_id: jetonId,
	});
};

export const POST = wrapServerRouteWithSentry(
	async ({ params, url, request }) => {
		// Validation des préconditions

		const { siret } = params;

		const apiVersion = getApiVersion(url);

		const jetonId = await auth(request);

		const { auditLogEntry, bilanData } = await parseRequest(
			url,
			request,
			jetonId,
			apiVersion,
		);

		try {
			if (!siretIsValid(siret)) {
				error(400, "Code SIRET de l’URL incorrect");
			}

			if (bilanData["siret"] !== siret) {
				error(400, "Numéros SIRET inconsistents");
			}

			await createBilan(auditLogEntry, jetonId);
			await getOrCreateEtablissement(siret);

			return new Response(null, { status: 204 });
		} catch (err) {
			if (isHttpError(err)) {
				await setLogEntryStatus(auditLogEntry, err.status);

				audit(
					"Erreur HTTP lors d’un envoi de bilan",
					{ request_log_id: auditLogEntry.id, api_token_id: jetonId },
					err,
				);
				throw err;
			}
			await setLogEntryStatus(auditLogEntry, 500);
			logger.exception(err, "Error de sauvegarde du bilan", {
				request_log_id: auditLogEntry.id,
				api_token_id: jetonId,
			});

			audit(
				"Erreur lors d’un envoi de bilan",
				{ request_log_id: auditLogEntry.id, api_token_id: jetonId },
				err,
			);

			throw err;
		}
	},
);
