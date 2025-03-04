import { generateState } from 'arctic';

import { fail, redirect } from '@sveltejs/kit';

import {
  PROCONNECT_DOMAIN,
  PROCONNECT_END_SESSION_ENDPOINT,
  PROCONNECT_POST_LOGOUT_REDIRECT_URI
} from '$env/static/private';

import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth/session';

import { OIDC_ID_TOKEN_COOKIE_NAME } from '$lib/constants';

////////////////////////////////////////////////////////////////////////////////////////////////////
// Implémentation du flux OIDC, déconnexion
// basé sur
// https://lucia-auth.com/tutorials/github-oauth/sveltekit
// et
// https://github.com/numerique-gouv/proconnect-documentation/blob/main/doc_fs/implementation_technique.md

export const actions = {
  default: async (event) => {
    if (event.locals.session === null) {
      return fail(401);
    }
    const idToken = event.cookies.get(OIDC_ID_TOKEN_COOKIE_NAME) ?? null;
    await invalidateSession(event.locals.session.id);
    deleteSessionTokenCookie(event.cookies);

    if (idToken !== null) {
      // eslint-disable-next-line drizzle/enforce-delete-with-where -- incorrectly considers this as a database operation
      event.cookies.delete(OIDC_ID_TOKEN_COOKIE_NAME, { path: '/' });
      // On prépare l’URL de déconnexion ProConnect
      const state = generateState();
      const url = new URL(`https://${PROCONNECT_DOMAIN}${PROCONNECT_END_SESSION_ENDPOINT}`);
      url.searchParams.append('id_token_hint', idToken);
      url.searchParams.append('post_logout_redirect_uri', PROCONNECT_POST_LOGOUT_REDIRECT_URI);
      url.searchParams.append('state', state);
      return redirect(302, url.toString());
    } else {
      redirect(302, '/');
    }
  }
};
