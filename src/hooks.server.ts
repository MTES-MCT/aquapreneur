import * as Sentry from "@sentry/sveltekit";
import { eq } from "drizzle-orm";

import type { Handle, HandleServerError, RequestEvent } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

import { env } from "$env/dynamic/private";
import {
	PUBLIC_SENTRY_DSN,
	PUBLIC_SENTRY_ENVIRONMENT,
	PUBLIC_SENTRY_TRACE_SAMPLE_RATE,
} from "$env/static/public";

import {
	deleteSessionTokenCookie,
	setSessionTokenCookie,
	validateSessionToken,
} from "$lib/server/auth/session";
import { db } from "$lib/server/db";
import { utilisateurs } from "$lib/server/db/schema/auth";
import type { Utilisateur } from "$lib/server/db/types";
import { getShortId } from "$lib/server/utils";
import audit from "$lib/server/utils/audit";
import * as logger from "$lib/server/utils/logger";

import { SESSION_COOKIE_NAME } from "$lib/constants";

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	tracesSampleRate: Number(PUBLIC_SENTRY_TRACE_SAMPLE_RATE || 0),
	environment: PUBLIC_SENTRY_ENVIRONMENT,
});

const handleAuth = async (event: RequestEvent) => {
	// Validation de la session
	// Basé sur https://lucia-auth.com/sessions/cookies/sveltekit
	let session = null;
	let utilisateur = null;

	const token = event.cookies.get(SESSION_COOKIE_NAME) ?? null;
	if (token !== null) {
		({ session, utilisateur } = await validateSessionToken(token));
		if (session !== null) {
			setSessionTokenCookie(event.cookies, token, session.dateExpiration);
		} else {
			audit("Suppression d’un cookie de session invalide");
			deleteSessionTokenCookie(event.cookies);
		}
	}

	if (utilisateur?.id !== session?.idUtilisateur) {
		logger.error("Utilisateur et session inconsistents");
	}

	if (utilisateur) {
		await db
			.update(utilisateurs)
			.set({ dernierAcces: new Date() })
			.where(eq(utilisateurs.id, utilisateur.id));
	}

	return { session, utilisateur };
};

const checkPermissions = (
	utilisateur: Utilisateur | null,
	routeId: string | null,
) => {
	// On utilise cette méthode pour protéger des sections entière.
	// Quand on veut protéger une seule page, la vérification des permissions est
	// faite sur la page elle même
	// (note: il faut éviter de faire ces vérifications dans les +layout.*.ts, car
	// ils peuvent être évalués en parallèle des layouts fils, et ces derniers risquent
	// d’exécuter du code non protégé. Voir par ex : https://github.com/sveltejs/kit/issues/6315
	// toujours ouvert à ce jour.

	// Seuls les administrateur·ices peuvent aux pages déclaration
	if (routeId === "/tableau-de-bord" || routeId?.startsWith("/d/")) {
		if (!utilisateur) {
			redirect(307, "/");
		} else if (!utilisateur.valide) {
			redirect(307, "/validation");
		} else if (!utilisateur.estAdmin) {
			redirect(307, "/");
		}
	}
};

export const appHandle: Handle = async ({ event, resolve }) => {
	const { session, utilisateur } = await handleAuth(event);

	event.locals.utilisateur = utilisateur;
	event.locals.session = session;

	checkPermissions(utilisateur, event.route.id);

	const response = await resolve(event);

	// session.id est un hachage sha256, donc non réversible. On préfère cependant
	// ne faire apparaitre que ses premiers caractères dans les logs.
	const shortSessionId = getShortId(event.locals.session?.id);

	if (!env.DISABLE_CANONICAL_LOGS) {
		logger.canonical(
			event,
			event.locals.utilisateur?.id,
			shortSessionId,
			response.status,
		);
	}

	response.headers.set("cross-origin-opener-policy", "same-origin");
	response.headers.set("cross-origin-resource-policy", "same-origin");
	response.headers.set(
		"Permissions-Policy",
		"geolocation=(), camera=(), microphone=()",
	);
	response.headers.set("referrer-policy", "strict-origin-when-cross-origin");
	response.headers.set("x-content-type-options", "nosniff");
	response.headers.set("x-dns-prefetch-control", "off");
	response.headers.set("x-frame-options", "DENY");

	return response;
};

export const handle = sequence(Sentry.sentryHandle(), appHandle);

export const appHandleError: HandleServerError = async ({
	error,
	status,
	message,
}) => {
	if (status !== 404) {
		console.error(error);
	}
	return { message };
};

export const handleError = Sentry.handleErrorWithSentry(appHandleError);
