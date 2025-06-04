import { generateState } from "arctic";

import { redirect } from "@sveltejs/kit";

import {
	PROCONNECT_AUTHORIZATION_ENDPOINT,
	PROCONNECT_DOMAIN,
} from "$env/static/private";

import { proconnect } from "$lib/server/auth/proconnect";

import { OIDC_STATE_COOKIE_NAME } from "$lib/constants";

////////////////////////////////////////////////////////////////////////////////////////////////////
// Implémentation du flux OIDC, préparation de l’URL de validation
// basé sur
// https://lucia-auth.com/tutorials/github-oauth/sveltekit
// et
// https://partenaires.proconnect.gouv.fr/docs/fournisseur-service/implementation_technique

export const actions = {
	default: async (event) => {
		const state = generateState();
		const url = proconnect.createAuthorizationURL(
			`https://${PROCONNECT_DOMAIN}${PROCONNECT_AUTHORIZATION_ENDPOINT}`,
			state,
			[
				"openid",
				// liste des scopes disponibles :
				// https://partenaires.proconnect.gouv.fr/docs/fournisseur-service/donnees_fournies
				"given_name",
				"usual_name",
				"email",
				"siret",
				"phone",
			],
		);

		// On ajoute ce "claim", afin de récupérer en sortie le champ `amr`
		// qui permet de vérifier si une authentification à deux facteurs a été utilisée
		// https://partenaires.proconnect.gouv.fr/docs/ressources/claim_amr
		url.searchParams.append(
			"claims",
			'{"id_token":{"amr":{"essential":true}}}',
		);

		event.cookies.set(OIDC_STATE_COOKIE_NAME, state, {
			path: "/",
			httpOnly: true,
			maxAge: 60 * 10,
			sameSite: "lax",
		});
		return redirect(302, url.toString());
	},
};
