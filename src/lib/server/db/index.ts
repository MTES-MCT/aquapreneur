import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "$env/dynamic/private";

if (!env.DATABASE_URL) {
	throw new Error(
		"La variable d’environnement DATABASE_URL n’est pas renseignée",
	);
}
const queryClient = postgres(env.DATABASE_URL, {
	// Les connexions restent ouvertes pendant les tests vitest, ce qui empêche
	// le test de terminer. On force donc un idle_timeout très faible.
	idle_timeout: import.meta.env.MODE === "test" ? 0.1 : undefined,
});

export const db = drizzle({
	client: queryClient,
	connection: env.DATABASE_URL,
	casing: "snake_case",
	// logger: true
});
