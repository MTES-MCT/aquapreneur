import * as Sentry from '@sentry/sveltekit';
import logger from 'pino';

import { sequence } from '@sveltejs/kit/hooks';

import {
  PUBLIC_SENTRY_DSN,
  PUBLIC_SENTRY_ENVIRONMENT,
  PUBLIC_SENTRY_TRACE_SAMPLE_RATE
} from '$env/static/public';

import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
  validateSessionToken
} from '$lib/server/auth/session';

import { SESSION_COOKIE_NAME } from '$lib/constants';

Sentry.init({
  dsn: PUBLIC_SENTRY_DSN,
  tracesSampleRate: Number(PUBLIC_SENTRY_TRACE_SAMPLE_RATE || 0),
  environment: PUBLIC_SENTRY_ENVIRONMENT
});

export const handle = sequence(Sentry.sentryHandle(), async ({ event, resolve }) => {
  // Validation de la session
  // Basé sur https://lucia-auth.com/sessions/cookies/sveltekit
  console.log('hooks.server', event.url.pathname);
  console.info('hello console');
  console.info('[INFO] hello console 2');
  logger({
    transport: {
      target: 'pino-pretty',
      options: {
        ignore: 'time,pid,hostname'
      }
    }
  }).info('hello pino');
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
});
export const handleError = Sentry.handleErrorWithSentry();
