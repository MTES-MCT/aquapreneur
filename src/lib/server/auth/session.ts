import { eq } from 'drizzle-orm';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';

import { db } from '$lib/server/db';
import { sessionsTable, usersTable } from '$lib/server/db/schema/auth';
import { SESSION_COOKIE_NAME } from '$lib/constants';

import type { Cookies } from '@sveltejs/kit';
import type { User, Session } from '$lib/server/db/schema/auth';

////////////////////////////////////////////////////////////////////////////////////////////////////
// Gestion des sessions
// basé sur https://lucia-auth.com/sessions/basic-api/drizzle-orm

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, userId: number): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    // Expiration à 30 jours
    expiresAt: new Date(Date.now() + 1000 * 3600 * 24 * 30)
  };
  await db.insert(sessionsTable).values(session);
  return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: usersTable, session: sessionsTable })
    .from(sessionsTable)
    .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
    .where(eq(sessionsTable.id, sessionId));
  if (result.length < 1) {
    return { session: null, user: null };
  }
  const { user, session } = result[0];
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, session.id));
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 3600 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 3600 * 24 * 30);
    await db
      .update(sessionsTable)
      .set({
        expiresAt: session.expiresAt
      })
      .where(eq(sessionsTable.id, session.id));
  }
  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
}

export async function invalidateAllSessions(userId: number): Promise<void> {
  await db.delete(sessionsTable).where(eq(sessionsTable.userId, userId));
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
  cookies.delete(SESSION_COOKIE_NAME, {
    path: '/'
  });
}
