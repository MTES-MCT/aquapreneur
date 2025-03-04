import { type OAuth2Tokens, decodeIdToken } from 'arctic';
import { eq } from 'drizzle-orm';

import { error, redirect } from '@sveltejs/kit';

import {
  PROCONNECT_DOMAIN,
  PROCONNECT_TOKEN_ENDPOINT,
  PROCONNECT_USERINFO_ENDPOINT
} from '$env/static/private';

import { proconnect } from '$lib/server/auth/proconnect';
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie
} from '$lib/server/auth/session';
import { db } from '$lib/server/db';
import { type Utilisateur, utilisateurs } from '$lib/server/db/schema/auth';

import { OIDC_ID_TOKEN_COOKIE_NAME, OIDC_STATE_COOKIE_NAME } from '$lib/constants';

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
    return error(400);
  }

  if (state !== storedState) {
    return error(400);
  }

  let tokens: OAuth2Tokens;

  try {
    tokens = await proconnect.validateAuthorizationCode(
      `https://${PROCONNECT_DOMAIN}${PROCONNECT_TOKEN_ENDPOINT}`,
      code,
      null
    );
  } catch (e) {
    // `code` ou client_id/client_secret incorrects
    console.log(e);
    return error(400);
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
  if (!('email' in payload && typeof payload.email === 'string')) {
    return error(400);
  }
  const query = await db
    .select()
    .from(utilisateurs)
    .where(eq(utilisateurs.courriel, payload.email));

  let utilisateur: Utilisateur;
  if (query.length) {
    utilisateur = query[0];
  } else {
    const query = await db
      .insert(utilisateurs)
      .values({
        courriel: payload.email
      })
      .returning();
    utilisateur = query[0];
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, utilisateur.id);
  setSessionTokenCookie(cookies, sessionToken, session.dateExpiration);

  // eslint-disable-next-line drizzle/enforce-delete-with-where -- incorrectly considers this as a database operation
  cookies.delete(OIDC_STATE_COOKIE_NAME, { path: '/' });

  return redirect(302, '/');
};
