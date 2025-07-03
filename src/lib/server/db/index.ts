import { drizzle } from "drizzle-orm/postgres-js";

import { env } from "$env/dynamic/private";

if (!env.DATABASE_URL) {
	throw new Error(
		"La variable d’environnement DATABASE_URL n’est pas renseignée",
	);
}

export const db = drizzle({
	connection: env.DATABASE_URL,
	casing: "snake_case",
	// logger: true
});
