// import { expect, test } from "@playwright/test";

////////////////////////////////////////////////////////////////////////////////////////////////////
// Pages entreprise
//

// TODO à reprendre quand on mettra en place le nouveau parcours producteur
// test.describe("entreprise", () => {
// 	test("Le bouton Déclaration 2024 sur Votre espace ouvre la déclaration", async ({
// 		page,
// 	}) => {
// 		await page.goto("/producteur/");

// 		await page.getByRole("link", { name: "Déclaration 2024" }).click();

// 		await expect(page).toHaveURL("/producteur/declarations/2024/entreprise/1");
// 	});

// 	test("Les redirections intermédiaires sont correctes", async ({ page }) => {
// 		await page.goto("/producteur/declarations");
// 		await expect(page).toHaveURL("/producteur/tableau-de-bord");

// 		await page.goto("/producteur/declarations/");
// 		await expect(page).toHaveURL("/producteur/tableau-de-bord");

// 		await page.goto("/producteur/declarations/2024");
// 		await expect(page).toHaveURL("/producteur/declarations/2024/entreprise/1");

// 		await page.goto("/producteur/declarations/2024/");
// 		await expect(page).toHaveURL("/producteur/declarations/2024/entreprise/1");

// 		await page.goto("/producteur/declarations/2024/entreprise");
// 		await expect(page).toHaveURL("/producteur/declarations/2024/entreprise/1");

// 		await page.goto("/producteur/declarations/2024/entreprise/");
// 		await expect(page).toHaveURL("/producteur/declarations/2024/entreprise/1");
// 	});
// });
