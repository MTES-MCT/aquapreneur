import { asc } from "drizzle-orm";

import { fail } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { etablissementsTable } from "$lib/server/db/schema/entreprise";

import { ADMIN_CURRENT_SIRET_COOKIE_NAME } from "$lib/constants";

export const load = async ({ parent }) => {
	const { utilisateur } = await parent();
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

	return {
		exploitants,
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
