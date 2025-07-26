import path from "path";
import { fileURLToPath } from "url";

import { expect, test } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authFile = path.join(__dirname, "../.auth/nonvalid-user.json");

////////////////////////////////////////////////////////////////////////////////////////////////////
// Connexion d’un utilisateur non validé
//

test.describe("Authentification", () => {
	test.use({ storageState: { cookies: [], origins: [] } });

	test("Connexion", async ({ page }) => {
		const email = process.env["PROCONNECT_TEST_USERNAME_2"]!;
		expect(email).toEqual(expect.stringContaining("@"));

		await page.goto("/");
		page.getByRole("button", { name: "S’identifier avec ProConnect" }).click();
		await page
			.getByRole("textbox", { name: "Email professionnel" })
			.fill(email);
		await page.getByRole("button", { name: "Continuer", exact: true }).click();
		await page
			.getByRole("textbox", { name: "Renseignez votre mot de passe" })
			.fill(email);
		await page.getByRole("button", { name: "S’identifier" }).click();
		await page
			.getByRole("button", {
				name: "Commune de marseille - Mairie (choisir cette organisation)",
			})
			.click();
		await page.context().storageState({ path: authFile });
	});
});

test.describe("Connecté mais non validés", () => {
	test.use({ storageState: authFile });

	test("Les utilisateurs non validés sont redirigés sur la page de validation", async ({
		page,
	}) => {
		await page.goto("/");
		await expect(page).toHaveURL("/validation");
	});

	// TODO à reprendre quand on mettra en place le nouveau parcours producteur
	// test("Les utilisateurs non validés ne peuvent pas acceder au tableau de bord", async ({
	// 	page,
	// }) => {
	// 	await page.goto("/producteur");
	// 	await expect(page).toHaveURL("/validation");
	// });

	// test("Les utilisateurs non validés ne peuvent pas acceder aux déclarations", async ({
	// 	page,
	// }) => {
	// 	await page.goto("/producteur/declarations/2024/entreprise/1");
	// 	await expect(page).toHaveURL("/validation");
	// });
});
