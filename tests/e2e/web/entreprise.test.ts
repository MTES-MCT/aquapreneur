import { expect, test } from "@playwright/test";

////////////////////////////////////////////////////////////////////////////////////////////////////
// Pages entreprise
//

test.describe("entreprise", () => {
	test("Le bouton Déclaration 2024 sur Votre espace ouvre la déclaration", async ({
		page,
	}) => {
		await page.goto("/votre-espace");

		await page.getByRole("link", { name: "Déclaration 2024" }).click();

		await expect(page).toHaveURL(
			"/votre-espace/declarations/2024/entreprise/1",
		);
	});

	test("Les redirections intermédiaires sont correctes", async ({ page }) => {
		let response = await page.goto("/votre-espace/declarations");
		expect(response?.status()).toBe(404);

		response = await page.goto("/votre-espace/declarations/");
		expect(response?.status()).toBe(404);

		await page.goto("/votre-espace/declarations/2024");
		await expect(page).toHaveURL(
			"/votre-espace/declarations/2024/entreprise/1",
		);

		await page.goto("/votre-espace/declarations/2024/");
		await expect(page).toHaveURL(
			"/votre-espace/declarations/2024/entreprise/1",
		);

		await page.goto("/votre-espace/declarations/2024/entreprise");
		await expect(page).toHaveURL(
			"/votre-espace/declarations/2024/entreprise/1",
		);

		await page.goto("/votre-espace/declarations/2024/entreprise/");
		await expect(page).toHaveURL(
			"/votre-espace/declarations/2024/entreprise/1",
		);
	});
});
