import { decodeIdToken, type OAuth2Tokens } from 'arctic';
import { eq } from 'drizzle-orm';

import { error, fail, redirect } from '@sveltejs/kit';

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
import { usersTable, type User } from '$lib/server/db/schema/auth';
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
    return error(400);
  }

  const tokenId = tokens.idToken();
  const decoded = decodeIdToken(tokenId);

  // On stocke le tokenId pour pouvoir déconnecter l’utilisateurice de ProConnect
  // Les sessions ProConnect durent 12h par défaut
  // https://github.com/numerique-gouv/proconnect-documentation/blob/main/doc_fs/implementation_technique.md#237-authentification-de-lutilisateur
  https: cookies.set(OIDC_ID_TOKEN_COOKIE_NAME, tokenId, {
    path: '/',
    httpOnly: true,
    maxAge: 3600 * 12,
    sameSite: 'lax'
  });

  const userResponse = await fetch(`https://${PROCONNECT_DOMAIN}${PROCONNECT_USERINFO_ENDPOINT}`, {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`
    }
  });

  const payload = decodeIdToken(await userResponse.text());
  if (!('email' in payload && typeof payload.email === 'string')) return error(400);

  const existingUsers = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, payload.email));

  let user: User;
  if (existingUsers.length) {
    user = existingUsers[0];
  } else {
    const users = await db
      .insert(usersTable)
      .values({
        email: payload.email
      })
      .returning();
    user = users[0];
  }
  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  setSessionTokenCookie(cookies, sessionToken, session.expiresAt);

  cookies.delete(OIDC_STATE_COOKIE_NAME, { path: '/' });

  return redirect(302, '/');
};
