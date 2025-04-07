import { eq } from 'drizzle-orm';
import path from 'path';
import { fileURLToPath } from 'url';

import { expect, test as setup } from '@playwright/test';

import { db } from '$db';

import { utilisateurs } from '$db/schema/auth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authFile = path.join(__dirname, '../.auth/user.json');

const validUserEmail = process.env['PROCONNECT_TEST_USERNAME']!;

setup('Authentification', async ({ page }) => {
  expect(validUserEmail).toEqual(expect.stringContaining('@'));

  // Authentification ProConnect
  await page.goto('/');
  page.getByRole('button', { name: 'S’identifier avec ProConnect' }).click();
  await page.getByRole('textbox', { name: 'Email professionnel' }).fill(validUserEmail!);
  await page.getByRole('button', { name: 'Continuer', exact: true }).click();
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.context().storageState({ path: authFile });

  // On force la validation de l’utilisateur
  await db
    .update(utilisateurs)
    .set({ valide: true })
    .where(eq(utilisateurs.courriel, validUserEmail));
});
