import { generateState } from "arctic";

import { redirect } from "@sveltejs/kit";

import {
	PROCONNECT_DOMAIN,
	PROCONNECT_END_SESSION_ENDPOINT,
	PROCONNECT_POST_LOGOUT_REDIRECT_URI,
} from "$env/static/private";

import {
	deleteSessionTokenCookie,
	invalidateSession,
} from "$lib/server/auth/session";
import { getShortId } from "$lib/server/utils";
import audit from "$lib/server/utils/audit";
import * as logger from "$lib/server/utils/logger";

import {
	ADMIN_CURRENT_SIRET_COOKIE_NAME,
	OIDC_ID_TOKEN_COOKIE_NAME,
} from "$lib/constants";

////////////////////////////////////////////////////////////////////////////////////////////////////
// Implémentation du flux OIDC, déconnexion
// basé sur
// https://lucia-auth.com/tutorials/github-oauth/sveltekit
// et
// https://partenaires.proconnect.gouv.fr/docs/fournisseur-service/implementation_technique

export const actions = {
	default: async ({ locals, cookies }) => {
		logger.info("Deconnexion");

		if (locals.session === null) {
			logger.error(
				"Tentative de deconnexion de proconnect avec une session vide",
			);
			redirect(302, "/");
		}
		const idToken = cookies.get(OIDC_ID_TOKEN_COOKIE_NAME) ?? null;

		const idUtilisateur = locals.utilisateur?.id;
		const idSession = locals.session.id;

		await invalidateSession(idSession);

		audit("Session invalidée en BDD", {
			user_id: idUtilisateur,
			session_id: getShortId(idSession),
		});

		deleteSessionTokenCookie(cookies);

		audit("Cookie de session supprimé", {
			user_id: idUtilisateur,
			session_id: getShortId(idSession),
		});

		// Suppression du cookie utilisé pour les administrateurs, permettant le choix
		// de l’entreprise à visualiser
		// eslint-disable-next-line drizzle/enforce-delete-with-where -- incorrectly considers this as a database operation
		cookies.delete(ADMIN_CURRENT_SIRET_COOKIE_NAME, {
			path: "/",
		});

		if (idToken !== null) {
			// eslint-disable-next-line drizzle/enforce-delete-with-where -- incorrectly considers this as a database operation
			cookies.delete(OIDC_ID_TOKEN_COOKIE_NAME, { path: "/" });
			// On prépare l’URL de déconnexion ProConnect
			const state = generateState();
			const url = new URL(
				`https://${PROCONNECT_DOMAIN}${PROCONNECT_END_SESSION_ENDPOINT}`,
			);
			url.searchParams.append("id_token_hint", idToken);
			url.searchParams.append(
				"post_logout_redirect_uri",
				PROCONNECT_POST_LOGOUT_REDIRECT_URI,
			);
			url.searchParams.append("state", state);

			audit("Deconnexion de ProConnect", {
				user_id: idUtilisateur,
			});

			return redirect(302, url.toString());
		} else {
			logger.info(
				"Pas de token OIDC, on ne peut pas deconnecter de ProConnect",
			);
			redirect(302, "/");
		}
	},
};
