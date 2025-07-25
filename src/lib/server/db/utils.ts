import { eq } from "drizzle-orm";

import { db } from "$lib/server/db";

import { getSha256Digest } from "../utils";
import { jetonsApi } from "./schema/api";

export const getJetonApiFromToken = async (token: string) => {
	const hashedToken = getSha256Digest(token);
	const req = await db
		.select()
		.from(jetonsApi)
		.where(eq(jetonsApi.hachage, hashedToken));
	return req.length ? req[0] : null;
};
