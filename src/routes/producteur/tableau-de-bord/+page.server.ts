import { asc } from "drizzle-orm";

import { fail } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { etablissementsTable } from "$lib/server/db/schema/entreprise";
import { getOrCreateDeclarations } from "$lib/server/declaration-store";
import * as logger from "$lib/server/utils/logger";
import { getOrCreateEtablissement } from "$lib/server/utils/sirene";

import { ADMIN_CURRENT_SIRET_COOKIE_NAME } from "$lib/constants";

export const load = async ({ parent, cookies }) => {
	const { utilisateur } = await parent();

	let siret: string | null = null;
	// Pour les administrateurs, leur propre siret n’est pas pertinent, on utilise
	// celui qui a été éventuellement choisi manuellement et stocké dans le cookie
	// `ADMIN_CURRENT_SIRET_COOKIE_NAME`
	if (utilisateur.estAdmin) {
		siret = cookies.get(ADMIN_CURRENT_SIRET_COOKIE_NAME) ?? null;
	} else {
		siret = utilisateur.siret;
	}

	let etablissement = null;
	let sireneError = false;
	if (siret) {
		try {
			etablissement = await getOrCreateEtablissement(siret);
		} catch (err) {
			logger.exception(err);
			sireneError = true;
		}
	}

	const declarations =
		etablissement ? await getOrCreateDeclarations(etablissement) : null;

	let exploitants;

	if (utilisateur.estAdmin) {
		exploitants = await db
			.selectDistinct({
				siret: etablissementsTable.siret,
				nom: etablissementsTable.denomination,
			})
			.from(etablissementsTable)
			.orderBy(asc(etablissementsTable.denomination));
	}

	// TODO gérer le cas où l’utilisateur n’a pas de siret ?
	return {
		sireneError,
		etablissement,
		declarations,
		exploitants,
		// on renvoie de nouveau l’objet utilisateur ici, au lieu de compter sur
		// celui du layout global puisque son type est maintenant plus precis
		// (non null)
		utilisateur,
	};
};

export const actions = {
	default: async ({ request, cookies, locals }) => {
		if (!locals.utilisateur?.estAdmin) {
			// TODO: ajouter test e2e
			return fail(403);
		}
		const data = await request.formData();
		const siret = data.get("select") ?? "";
		if (siret) {
			cookies.set(ADMIN_CURRENT_SIRET_COOKIE_NAME, siret as string, {
				path: "/",
			});
		}
		return { siret };
	},
};
