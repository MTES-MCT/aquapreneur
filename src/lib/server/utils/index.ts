import { sha256 } from "@oslojs/crypto/sha2";
import {
	encodeBase32LowerCaseNoPadding,
	encodeHexLowerCase,
} from "@oslojs/encoding";
import crypto from "crypto";

export const getShortId = (sessionId?: string) => {
	return sessionId ? sessionId.substring(0, 7) : undefined;
};

export const getSecureRandomString = (size: number): string => {
	// https://lucia-auth.com/sessions/basic-api/drizzle-orm
	const bytes = new Uint8Array(size);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
};

export const getSha256Digest = (token: string): string => {
	// https://lucia-auth.com/sessions/basic-api/drizzle-orm
	return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
};

export const generateApiToken = (numBytes = 32) => {
	const token = getSecureRandomString(numBytes);
	return {
		token,
		digest: getSha256Digest(token),
	};
};
