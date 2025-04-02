import path from 'path';
import { fileURLToPath } from 'url';

import { test as setup } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Authentification ProConnect
  await page.goto('/');
  page.getByRole('button', { name: 'S’identifier avec ProConnect' }).click();
  await page
    .getByRole('textbox', { name: 'Email professionnel' })
    .fill(process.env['PROCONNECT_TEST_USERNAME']!);
  await page.getByRole('button', { name: 'Continuer', exact: true }).click();
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.waitForURL('**/mon-espace');
  await page.context().storageState({ path: authFile });
});
