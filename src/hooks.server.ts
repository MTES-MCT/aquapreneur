import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
  validateSessionToken
} from '$lib/server/auth/session';

import { SESSION_COOKIE_NAME } from '$lib/constants';

export const handle = async ({ event, resolve }) => {
  // Validation de la session
  // Basé sur https://lucia-auth.com/sessions/cookies/sveltekit
  const token = event.cookies.get(SESSION_COOKIE_NAME) ?? null;
  if (token === null) {
    event.locals.utilisateur = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, utilisateur } = await validateSessionToken(token);
  if (session !== null) {
    setSessionTokenCookie(event.cookies, token, session.dateExpiration);
  } else {
    deleteSessionTokenCookie(event.cookies);
  }

  event.locals.session = session;
  event.locals.utilisateur = utilisateur;
  return resolve(event);
};
