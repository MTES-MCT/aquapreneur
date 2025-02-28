import { generateState } from 'arctic';

import { redirect } from '@sveltejs/kit';

import { PROCONNECT_DOMAIN, PROCONNECT_AUTHORIZATION_ENDPOINT } from '$env/static/private';

import { proconnect } from '$lib/server/auth/proconnect';
import { OIDC_STATE_COOKIE_NAME } from '$lib/constants';

////////////////////////////////////////////////////////////////////////////////////////////////////
// Implémentation du flux OIDC, préparation de l’URL de validation
// basé sur
// https://lucia-auth.com/tutorials/github-oauth/sveltekit
// et
// https://github.com/numerique-gouv/proconnect-documentation/blob/main/doc_fs/implementation_technique.md

export const actions = {
  default: async (event) => {
    const state = generateState();
    const url = proconnect.createAuthorizationURL(
      `https://${PROCONNECT_DOMAIN}${PROCONNECT_AUTHORIZATION_ENDPOINT}`,
      state,
      [
        'openid',
        // liste des scopes disponibles :
        // https://github.com/numerique-gouv/proconnect-documentation/blob/main/doc_fs/donnees_fournies.md
        'given_name',
        'usual_name',
        'email',
        'uid',
        'address',
        'siret',
        'organizational_unit',
        'belonging_population',
        'phone',
        'idp_id'
      ]
    );

    event.cookies.set(OIDC_STATE_COOKIE_NAME, state, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: 'lax'
    });
    return redirect(302, url.toString());
  }
};
