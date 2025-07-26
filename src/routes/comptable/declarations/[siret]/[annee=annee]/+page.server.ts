import { error, redirect } from "@sveltejs/kit";

import { deleteDeclaration } from "$lib/server/declaration-store";

import { estAnneeDeclarative } from "$lib/utils";

import type { Actions } from "./$types";

export const actions = {
	default: async ({ params, url, locals }) => {
		const { siret, annee } = params;
		const { utilisateur } = locals;
		// TODO ajouter des tests de permission
		if (!utilisateur) {
			error(401);
		}
		if (!utilisateur.estAdmin) {
			// TODO: dans un premier temps, on n’autorise l’édition qu’aux administrateur·ices
			error(403, "Action réservée aux administrateur·ices");
		}
		const numAnnee = Number.parseInt(annee);
		if (estAnneeDeclarative(numAnnee)) {
			deleteDeclaration(siret, numAnnee);
		}
		redirect(302, url.pathname);
	},
} satisfies Actions;
