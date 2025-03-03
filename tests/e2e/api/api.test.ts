import { expect, test } from '@playwright/test';

////////////////////////////////////////////////////////////////////////////////////////////////////
// Tests e2e de l’API
//
// doc : https://playwright.dev/docs/api-testing
// exemples dans le dépot SvelteKit :
// https://github.com/sveltejs/kit/blob/main/packages/kit/test/apps/basics/test/server.test.js

test('L’API n’est pas encore implémentée', async ({ request }) => {
  const response = await request.get('/api/');
  expect(response.status()).toBe(404);
});
