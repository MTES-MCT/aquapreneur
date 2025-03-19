import * as Sentry from '@sentry/sveltekit';

import { sequence } from '@sveltejs/kit/hooks';

import {
  PUBLIC_SENTRY_DSN,
  PUBLIC_SENTRY_ENVIRONMENT,
  PUBLIC_SENTRY_TRACE_SAMPLE_RATE
} from '$env/static/public';

import * as logger from '$utils/logger';

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
  console.log(event);
  console.log(event.request.headers);
  // Validation de la session
  // Basé sur https://lucia-auth.com/sessions/cookies/sveltekit
  // console.log(event);
  // console.log(event.getClientAddress());
  // audit('my audit msg');
  // console.log('hooks.server', event.url.pathname);
  // console.info('hello console');
  // console.info('[INFO] hello console 2');
  logger.info('hello logger', { test: 'value' });
  //   {
  //   transport: {
  //     options: {
  //       ignore: 'time,pid,hostname'
  //     }
  //   }
  // }
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
  console.log(event.request.headers);
  console.log(event.request.headers.get('x-request-id'));
  event.locals.auditContext = {
    // https://doc.scalingo.com/platform/app/x-request-id#definition-of-the-x-request-id-header
    requestId: event.request.headers.get('x-request-id'),
    sessionId: session?.id,
    userId: utilisateur?.id,
    ipAddress: event.getClientAddress()
  };
  console.log('before canonical');
  logger.canonical(event.locals.auditContext);
  console.log('after canonical');
  return resolve(event);
});
export const handleError = Sentry.handleErrorWithSentry();
