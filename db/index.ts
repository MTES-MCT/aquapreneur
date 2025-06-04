// Ce fichier peut être appelé hors du contexte Vite (scripts, tests E2E), on
// ne peut pas compter sur la gestion habituelle des variables d’environnement
// (`$env/static/private` ou `$env/dynamic/private` de SvelteKit, ni
// import.meta.env de Vite). On passe donc directement par process.env
import dotenvx from "@dotenvx/dotenvx";
import { drizzle } from "drizzle-orm/postgres-js";

dotenvx.config({ ignore: ["MISSING_ENV_FILE"], quiet: true });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
	throw new Error(
		"La variable d’environnement DATABASE_URL n’est pas renseignée",
	);
}

export const db = drizzle({
	connection: DATABASE_URL,
	casing: "snake_case",
	// logger: true
});
