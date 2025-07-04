import { expect, test } from "@playwright/test";

////////////////////////////////////////////////////////////////////////////////////////////////////
// Page d’accueil
//

test("La page d’accueil redirige les utilisateurs connectés", async ({
	page,
}) => {
	await page.goto("/");
	await expect(page).toHaveURL("/producteur");
	await expect(page).toHaveTitle("Votre espace | Aquapreneur");
});

test("La page de validation redirige vers le tableau de bord", async ({
	page,
}) => {
	await page.goto("/validation");
	await expect(page).toHaveURL("/producteur");
});
