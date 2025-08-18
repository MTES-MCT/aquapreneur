import { type OAuth2Tokens, decodeIdToken } from "arctic";
import { type } from "arktype";
import { eq } from "drizzle-orm";

import { error, redirect } from "@sveltejs/kit";

import { env } from "$env/dynamic/private";

import { proconnect } from "$lib/server/auth/proconnect";
import { createSession, setSessionTokenCookie } from "$lib/server/auth/session";
import { db } from "$lib/server/db";
import { utilisateurs } from "$lib/server/db/schema/auth";
import { type Utilisateur } from "$lib/server/db/types";
import { getShortId } from "$lib/server/utils";
import audit from "$lib/server/utils/audit";
import * as logger from "$lib/server/utils/logger";

import {
	OIDC_ID_TOKEN_COOKIE_NAME,
	OIDC_STATE_COOKIE_NAME,
} from "$lib/constants";
import { Email, Siret } from "$lib/types";

// https://partenaires.proconnect.gouv.fr/docs/fournisseur-service/donnees_fournies

const UserInfoPayloadSchema = type({
	"+": "ignore",
	"sub": "string",
	"given_name": "string",
	"usual_name": "string",
	"email": Email,
	"siret": Siret,
	"phone_number?": "string | null",
});

// https://partenaires.proconnect.gouv.fr/docs/ressources/claim_amr
const AmrEnum = type("('pwd' | 'mail' | 'totp' | 'pop' | 'mfa')[]");
type AmrEnum = typeof AmrEnum.infer;

const IdTokenPayloadSchema = type({
	"+": "ignore",
	"amr": AmrEnum,
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Implémentation du flux OIDC, callback de validation
// basé sur
// https://lucia-auth.com/tutorials/github-oauth/sveltekit
// et
// https://partenaires.proconnect.gouv.fr/docs/fournisseur-service/implementation_technique

export const load = async ({ url, cookies }) => {
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies.get(OIDC_STATE_COOKIE_NAME) ?? null;
	if (code === null || state === null || storedState === null) {
		logger.error("`code` ou `state` ou `storedState` manquants");
		error(400);
	}

	if (state !== storedState) {
		logger.error("`state` différent de  `storedState`");
		error(400);
	}

	let tokens: OAuth2Tokens;

	try {
		tokens = await proconnect.validateAuthorizationCode(
			`https://${env.PROCONNECT_DOMAIN}${env.PROCONNECT_TOKEN_ENDPOINT}`,
			code,
			null,
		);
	} catch (err) {
		logger.exception(err, "`code` ou `client_id/client_secret` incorrects");
		error(400);
	}
	const tokenId = tokens.idToken();

	// Vérification de la connexion MFA
	let amr: AmrEnum = [];
	const idTokenParsedResult = IdTokenPayloadSchema(decodeIdToken(tokenId));

	if (!(idTokenParsedResult instanceof type.errors)) {
		amr = idTokenParsedResult.amr;
	}

	// On stocke le tokenId pour pouvoir déconnecter l’utilisateurice de ProConnect
	// Les sessions ProConnect durent 12h par défaut
	// https://partenaires.proconnect.gouv.fr/docs/fournisseur-service/implementation_technique#:~:text=2.3.7.%20Authentification%20de%20l%27utilisateur
	cookies.set(OIDC_ID_TOKEN_COOKIE_NAME, tokenId, {
		path: "/",
		httpOnly: true,
		maxAge: 3600 * 12,
		sameSite: "lax",
	});

	const userInfoResponse = await fetch(
		`https://${env.PROCONNECT_DOMAIN}${env.PROCONNECT_USERINFO_ENDPOINT}`,
		{
			headers: {
				Authorization: `Bearer ${tokens.accessToken()}`,
			},
		},
	);
	const userInfoPayload = decodeIdToken(await userInfoResponse.text());
	const parsedResult = UserInfoPayloadSchema(userInfoPayload);
	if (parsedResult instanceof type.errors) {
		logger.error("IdToken OIDC invalide", {
			error: parsedResult.summary,
		});
		error(400);
	}
	const userData = parsedResult;
	const query = await db
		.select()
		.from(utilisateurs)
		.where(eq(utilisateurs.idProConnect, userData.sub));

	let utilisateur: Utilisateur;
	if (query.length) {
		utilisateur = query[0];
		const hasMFA =
			amr.includes("totp") || amr.includes("pop") || amr.includes("mfa");
		if (env.PROCONNECT_FORCE_ADMIN_MFA === "1" && utilisateur.estAdmin) {
			// Les administateur·ices **doivent utiliser une authentification 2FA
			if (!hasMFA) {
				audit("Tentative de connexion d’un administrateur sans MFA", {
					user_id: utilisateur.id,
					amr,
				});
				// TODO forcer le logout de ProConnect ?
				redirect(307, "/mfa");
			}
		}
		// Le compte correspondant au `sub` existe déjà, on le met à jour.
		// TODO gérer le changement d’adresse email, de service, etc ?
		await db
			.update(utilisateurs)
			.set({ derniereConnexion: new Date() })
			.where(eq(utilisateurs.id, utilisateur.id));

		if (utilisateur.estAdmin) {
			audit("Connexion ProConnect d’un administrateur existant", {
				user_id: utilisateur.id,
				amr,
			});
		} else {
			audit("Connexion ProConnect d’un utilisateur existant", {
				user_id: utilisateur.id,
			});
		}
	} else {
		const query = await db
			.insert(utilisateurs)
			.values({
				idProConnect: userData["sub"],
				courriel: userData["email"],
				prenom: userData["given_name"],
				nom: userData["usual_name"],
				siret: userData["siret"],
				telephone: userData["phone_number"],
				derniereConnexion: new Date(),
			})
			.returning();
		utilisateur = query[0];
		audit("Nouveau compte utilisateur créé via ProConnect", {
			user_id: utilisateur.id,
		});
	}

	const { sessionToken, session } = await createSession(utilisateur.id);

	setSessionTokenCookie(cookies, sessionToken, session.dateExpiration);
	audit("Nouvelle session créée ", {
		user_id: utilisateur.id,
		session_id: getShortId(session.id),
	});
	// eslint-disable-next-line drizzle/enforce-delete-with-where -- incorrectly considers this as a database operation
	cookies.delete(OIDC_STATE_COOKIE_NAME, { path: "/" });

	return redirect(302, "/");
};
