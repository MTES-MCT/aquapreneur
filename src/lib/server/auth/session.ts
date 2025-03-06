import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';

import type { Cookies } from '@sveltejs/kit';

import { db } from '$db';

import { sessions, utilisateurs } from '$db/schema/auth';
import type { Session, Utilisateur } from '$db/schema/auth';

import { SESSION_COOKIE_NAME } from '$lib/constants';

////////////////////////////////////////////////////////////////////////////////////////////////////
// Gestion des sessions
// basé sur https://lucia-auth.com/sessions/basic-api/drizzle-orm

export type SessionValidationResult =
  | { session: Session; utilisateur: Utilisateur }
  | { session: null; utilisateur: null };

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, idUtilisateur: number): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session: Session = {
    id: sessionId,
    idUtilisateur,
    // Expiration à 30 jours
    dateExpiration: new Date(Date.now() + 1000 * 3600 * 24 * 30)
  };
  await db.insert(sessions).values(session);
  return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ utilisateur: utilisateurs, session: sessions })
    .from(sessions)
    .innerJoin(utilisateurs, eq(sessions.idUtilisateur, utilisateurs.id))
    .where(eq(sessions.id, sessionId));
  if (result.length < 1) {
    return { session: null, utilisateur: null };
  }
  const { utilisateur, session } = result[0];
  if (Date.now() >= session.dateExpiration.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id));
    return { session: null, utilisateur: null };
  }
  if (Date.now() >= session.dateExpiration.getTime() - 1000 * 3600 * 24 * 15) {
    session.dateExpiration = new Date(Date.now() + 1000 * 3600 * 24 * 30);
    await db
      .update(sessions)
      .set({
        dateExpiration: session.dateExpiration
      })
      .where(eq(sessions.id, session.id));
  }
  return { session, utilisateur };
}

export async function invalidateSession(idSession: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, idSession));
}

export async function invalidateAllSessions(idUtilisateur: number): Promise<void> {
  await db.delete(sessions).where(eq(sessions.idUtilisateur, idUtilisateur));
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Gestion des cookies de session
// Basé sur https://lucia-auth.com/sessions/cookies/sveltekit

export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date): void {
  cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    expires: expiresAt,
    path: '/'
  });
}

export function deleteSessionTokenCookie(cookies: Cookies): void {
  // eslint-disable-next-line drizzle/enforce-delete-with-where -- incorrectly considers this as a database operation
  cookies.delete(SESSION_COOKIE_NAME, {
    path: '/'
  });
}
