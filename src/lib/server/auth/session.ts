import { eq } from "drizzle-orm";

import type { Cookies } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { sessions, utilisateurs } from "$lib/server/db/schema/auth";

import { SESSION_COOKIE_NAME } from "$lib/constants";

import type { Session } from "../db/types";
import type { Utilisateur } from "../db/types";
import { getSecureRandomString, getSha256Digest, getShortId } from "../utils";
import audit from "../utils/audit";

////////////////////////////////////////////////////////////////////////////////////////////////////
// Gestion des sessions
// basé sur https://lucia-auth.com/sessions/basic-api/drizzle-orm

export type SessionValidationResult =
	| { session: Session; utilisateur: Utilisateur }
	| { session: null; utilisateur: null };

export async function createSession(
	idUtilisateur: number,
): Promise<{ sessionToken: string; session: Session }> {
	const sessionToken = getSecureRandomString(20);
	const sessionId = getSha256Digest(sessionToken);

	const data = {
		id: sessionId,
		idUtilisateur,
		// Expiration à 30 jours
		dateExpiration: new Date(Date.now() + 1000 * 3600 * 24 * 30),
	};
	return {
		sessionToken,
		session: (await db.insert(sessions).values(data).returning())[0],
	};
}

export async function validateSessionToken(
	token: string,
): Promise<SessionValidationResult> {
	const sessionId = getSha256Digest(token);
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

		audit("Suppression d’une session expirée", {
			user_id: utilisateur.id,
			session_id: getShortId(session.id),
			session_expiration: session.dateExpiration.toISOString(),
		});

		return { session: null, utilisateur: null };
	}
	if (Date.now() >= session.dateExpiration.getTime() - 1000 * 3600 * 24 * 15) {
		const originalDate = session.dateExpiration;
		session.dateExpiration = new Date(Date.now() + 1000 * 3600 * 24 * 30);
		await db
			.update(sessions)
			.set({
				dateExpiration: session.dateExpiration,
			})
			.where(eq(sessions.id, session.id));

		audit("Prolongation d’une session expirant dans moins de 15 jours", {
			user_id: utilisateur.id,
			session_id: getShortId(session.id),
			previous_session_expiration: originalDate.toISOString(),
			new_session_expiration: session.dateExpiration.toISOString(),
		});
	}
	return { session, utilisateur };
}

export async function invalidateSession(idSession: string) {
	await db.delete(sessions).where(eq(sessions.id, idSession));
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Gestion des cookies de session
// Basé sur https://lucia-auth.com/sessions/cookies/sveltekit

export function setSessionTokenCookie(
	cookies: Cookies,
	token: string,
	expiresAt: Date,
): void {
	cookies.set(SESSION_COOKIE_NAME, token, {
		httpOnly: true,
		sameSite: "lax",
		expires: expiresAt,
		path: "/",
	});
}

export function deleteSessionTokenCookie(cookies: Cookies): void {
	// eslint-disable-next-line drizzle/enforce-delete-with-where -- incorrectly considers this as a database operation
	cookies.delete(SESSION_COOKIE_NAME, {
		path: "/",
	});
}
