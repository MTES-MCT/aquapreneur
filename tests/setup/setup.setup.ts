import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { reset } from "drizzle-seed";
import path from "path";
import { fileURLToPath } from "url";

import { expect, test as setup } from "@playwright/test";

import { bilans, evtsJournalReqs, jetonsApi } from "$lib/server/db/schema/api";
import { concessionsTable } from "$lib/server/db/schema/atena";
import { sessions, utilisateurs } from "$lib/server/db/schema/auth";
import { declarationsTable } from "$lib/server/db/schema/declaration";
import {
	entreprises,
	etablissementsTable,
} from "$lib/server/db/schema/entreprise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authFile = path.join(__dirname, "../.auth/user.json");

const validUserEmail = process.env["PROCONNECT_TEST_USERNAME"]!;

if (!process.env.DATABASE_URL) {
	throw new Error(
		"La variable d’environnement DATABASE_URL n’est pas renseignée",
	);
}

if (!process.env.DATABASE_URL.includes("-test")) {
	throw new Error(
		"La variable d’environnement DATABASE_URL n’est pas une URL de test",
	);
}

const db = drizzle({
	connection: process.env.DATABASE_URL,
	casing: "snake_case",
});

setup("Cleanup", async () => {
	await reset(db, {
		concessionsTable,
		declarationsTable,
		evtsJournalReqs,
		bilans,
		etablissementsTable,
		entreprises,
		jetonsApi,
		sessions,
		utilisateurs,
	});
});

setup("Authentification", async ({ page }) => {
	expect(validUserEmail).toEqual(expect.stringContaining("@"));

	// Authentification ProConnect
	await page.goto("/");
	page.getByRole("button", { name: "S’identifier avec ProConnect" }).click();
	await page
		.getByRole("textbox", { name: "Email professionnel" })
		.fill(validUserEmail!);
	await page.getByRole("button", { name: "Continuer", exact: true }).click();
	await page.getByRole("button", { name: "Se connecter" }).click();
	await page.context().storageState({ path: authFile });

	// On force la validation de l’utilisateur
	await db
		.update(utilisateurs)
		.set({ valide: true })
		.where(eq(utilisateurs.courriel, validUserEmail));
});
