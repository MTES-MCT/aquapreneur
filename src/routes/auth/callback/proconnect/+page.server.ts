import { type OAuth2Tokens, decodeIdToken } from 'arctic';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { error, redirect } from '@sveltejs/kit';

import {
  PROCONNECT_DOMAIN,
  PROCONNECT_TOKEN_ENDPOINT,
  PROCONNECT_USERINFO_ENDPOINT
} from '$env/static/private';

import { db } from '$db';

import { type Utilisateur, utilisateurs } from '$db/schema/auth';

import { getShortId } from '$utils';

import audit from '$utils/audit';
import * as logger from '$utils/logger';

import { proconnect } from '$lib/server/auth/proconnect';
import { createSession, setSessionTokenCookie } from '$lib/server/auth/session';

import { OIDC_ID_TOKEN_COOKIE_NAME, OIDC_STATE_COOKIE_NAME } from '$lib/constants';

// https://github.com/numerique-gouv/proconnect-documentation/blob/main/doc_fs/donnees_fournies.md
const proConnectPayload = z.object({
  sub: z.string(),
  given_name: z.string(),
  usual_name: z.string(),
  email: z.string().email().toLowerCase(),
  siret: z.string(),
  phone_number: z.string(),
  organizational_unit: z.string(),
  belonging_population: z.string()
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Implémentation du flux OIDC, callback de validation
// basé sur
// https://lucia-auth.com/tutorials/github-oauth/sveltekit
// et
// https://github.com/numerique-gouv/proconnect-documentation/blob/main/doc_fs/implementation_technique.md

export const load = async ({ url, cookies }) => {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies.get(OIDC_STATE_COOKIE_NAME) ?? null;
  if (code === null || state === null || storedState === null) {
    logger.error('`code` ou `state` ou `storedState` manquants');
    error(400);
  }

  if (state !== storedState) {
    logger.error('`state` différent de  `storedState`');
    error(400);
  }

  let tokens: OAuth2Tokens;

  try {
    tokens = await proconnect.validateAuthorizationCode(
      `https://${PROCONNECT_DOMAIN}${PROCONNECT_TOKEN_ENDPOINT}`,
      code,
      null
    );
  } catch (err) {
    logger.exception(err, '`code` ou `client_id/client_secret` incorrects');
    error(400);
  }

  const tokenId = tokens.idToken();

  // On stocke le tokenId pour pouvoir déconnecter l’utilisateurice de ProConnect
  // Les sessions ProConnect durent 12h par défaut
  // https://github.com/numerique-gouv/proconnect-documentation/blob/main/doc_fs/implementation_technique.md#237-authentification-de-lutilisateur
  cookies.set(OIDC_ID_TOKEN_COOKIE_NAME, tokenId, {
    path: '/',
    httpOnly: true,
    maxAge: 3600 * 12,
    sameSite: 'lax'
  });

  const userInfoResponse = await fetch(
    `https://${PROCONNECT_DOMAIN}${PROCONNECT_USERINFO_ENDPOINT}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`
      }
    }
  );
  const payload = decodeIdToken(await userInfoResponse.text());
  const parsedResult = proConnectPayload.safeParse(payload);
  if (parsedResult.success === false) {
    logger.error('IdToken OIDC invalide', parsedResult.error);
    error(400);
  }
  const userData = parsedResult.data;
  const query = await db
    .select()
    .from(utilisateurs)
    .where(eq(utilisateurs.idProConnect, userData.sub));

  let utilisateur: Utilisateur;
  if (query.length) {
    utilisateur = query[0];
    // Le compte correspondant au `sub` existe déjà, on le met à jour.
    // TODO gérer le changement d’adresse email, de service, etc ?
    await db
      .update(utilisateurs)
      .set({ derniereConnexion: new Date() })
      .where(eq(utilisateurs.id, utilisateur.id));
    audit('Connexion ProConnect d’un utilisateur existant', {
      user_id: utilisateur.id
    });
  } else {
    const query = await db
      .insert(utilisateurs)
      .values({
        idProConnect: userData['sub'],
        courriel: userData['email'],
        prenom: userData['given_name'],
        nom: userData['usual_name'],
        siret: userData['siret'],
        telephone: userData['phone_number'],
        service: userData['organizational_unit'],
        statut: userData['belonging_population'],
        derniereConnexion: new Date()
      })
      .returning();
    utilisateur = query[0];
    audit('Nouveau compte utilisateur créé via ProConnect', {
      user_id: utilisateur.id
    });
  }

  const { sessionToken, session } = await createSession(utilisateur.id);

  setSessionTokenCookie(cookies, sessionToken, session.dateExpiration);
  audit('Nouvelle session créée ', {
    user_id: utilisateur.id,
    session_id: getShortId(session.id)
  });
  // eslint-disable-next-line drizzle/enforce-delete-with-where -- incorrectly considers this as a database operation
  cookies.delete(OIDC_STATE_COOKIE_NAME, { path: '/' });

  return redirect(302, '/');
};
