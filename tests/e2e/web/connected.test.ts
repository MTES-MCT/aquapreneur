import { expect, test } from '@playwright/test';

////////////////////////////////////////////////////////////////////////////////////////////////////
// Page d’accueil
//

test('La page d’accueil redirige les utilisateurs connectés', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/mon-espace');
  await expect(page).toHaveTitle('Mon espace | Aquapreneur');
});
