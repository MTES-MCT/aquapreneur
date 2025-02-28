import { SESSION_COOKIE_NAME } from '$lib/constants';
import {
  validateSessionToken,
  setSessionTokenCookie,
  deleteSessionTokenCookie
} from '$lib/server/auth/session';

export const handle = async ({ event, resolve }) => {
  // Validation de la session
  // Basé sur https://lucia-auth.com/sessions/cookies/sveltekit
  const token = event.cookies.get(SESSION_COOKIE_NAME) ?? null;
  if (token === null) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await validateSessionToken(token);
  if (session !== null) {
    setSessionTokenCookie(event.cookies, token, session.expiresAt);
  } else {
    deleteSessionTokenCookie(event.cookies);
  }

  event.locals.session = session;
  event.locals.user = user;
  return resolve(event);
};
