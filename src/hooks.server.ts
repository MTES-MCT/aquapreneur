import * as Sentry from '@sentry/sveltekit';

import { sequence } from '@sveltejs/kit/hooks';

import {
  PUBLIC_SENTRY_DSN,
  PUBLIC_SENTRY_ENVIRONMENT,
  PUBLIC_SENTRY_TRACE_SAMPLE_RATE
} from '$env/static/public';

import audit from '$utils/audit';
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
  // Validation de la session
  // Basé sur https://lucia-auth.com/sessions/cookies/sveltekit

  // logger.info('hello logger', { test: 'value' });
  //   {
  //   transport: {
  //     options: {
  //       ignore: 'time,pid,hostname'
  //     }
  //   }
  // }
  const r = event.request;
  const h = r.headers;
  const logContext = {
    requestId: h.get('x-request-id'),
    ipAddress: h.get('x-real-ip') || event.getClientAddress(),
    method: r.method,
    userAgent: h.get('user-agent'),
    url: r.url
  };
  const token = event.cookies.get(SESSION_COOKIE_NAME) ?? null;
  if (token === null) {
    event.locals.utilisateur = null;
    event.locals.session = null;
    const auditContext = {
      // https://doc.scalingo.com/platform/app/x-request-id#definition-of-the-x-request-id-header
      ...logContext,
      sessionId: null,
      userId: null
    };
    event.locals.audit = (msg) => audit(msg, auditContext);

    logger.canonical(auditContext);
    return resolve(event);
  }

  const { session, utilisateur } = await validateSessionToken(token);
  if (session !== null) {
    setSessionTokenCookie(event.cookies, token, session.dateExpiration);
  } else {
    deleteSessionTokenCookie(event.cookies);
  }
  event.locals.utilisateur = utilisateur;
  event.locals.session = session;
  const auditContext = {
    // https://doc.scalingo.com/platform/app/x-request-id#definition-of-the-x-request-id-header
    ...logContext,
    sessionId: session?.id,
    userId: utilisateur?.id
  };
  event.locals.audit = (msg) => audit(msg, auditContext);

  logger.canonical(auditContext);
  return resolve(event);
});
export const handleError = Sentry.handleErrorWithSentry();
