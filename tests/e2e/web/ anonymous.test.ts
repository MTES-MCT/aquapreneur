import { expect, test } from "@playwright/test";

////////////////////////////////////////////////////////////////////////////////////////////////////
// Page d’accueil
//

test.use({ storageState: { cookies: [], origins: [] } });
test("La page d’accueil ne redirige pas", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveURL("/");
});

test("La page d’accueil a un titre", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle("Accueil | Aquapreneur");
});

test("La page de validation redirige vers la page d’accueil", async ({
	page,
}) => {
	await page.goto("/validation");
	await expect(page).toHaveURL("/");
});
