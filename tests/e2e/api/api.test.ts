import { reset } from 'drizzle-seed';

import { expect, test } from '@playwright/test';

import { db } from '$db';

import * as authSchema from '$db/schema/auth';
import * as bilanSchema from '$db/schema/bilan';

import { generateApiToken } from '$utils';

////////////////////////////////////////////////////////////////////////////////////////////////////
// Tests e2e de l’API
//
// doc : https://playwright.dev/docs/api-testing
// exemples dans le dépot SvelteKit :
// https://github.com/sveltejs/kit/blob/main/packages/kit/test/apps/basics/test/server.test.js

let validAuthToken: string;

test.beforeAll(async () => {
  // On veut être certain de travailler sur une base de test
  if (!db.$client.options.database.includes('-test')) {
    console.error(`Base de donnée utilisée : ${db.$client.options.database}`);
    throw new Error('Les tests doivent utiliser une BDD dédiée');
  }
  // Remise à zero de la DBB de test
  await reset(db, { ...authSchema, ...bilanSchema });

  // Génération d’un token d’authentification
  const { token, digest } = generateApiToken();
  validAuthToken = token;
  const values = {
    hachage: digest,
    nomPartenaire: 'partenaire test',
    siretPartenaire: '12345678901234'
  };
  await db.insert(authSchema.jetonsAPI).values(values);
});

test('401 pour les requêtes non authentifiées', async ({ request }) => {
  const response = await request.post('/api/v0/bilan/cgo/1234', {
    data: {}
  });
  expect(response.status()).toBe(401);
});

test('401 pour les jetons invalides', async ({ request }) => {
  const response = await request.post('/api/v0/bilan/cgo/1234', {
    headers: { Authorization: `Bearer XXX` },
    data: {}
  });
  expect(response.status()).toBe(401);
});

test('204 en cas de succès', async ({ request }) => {
  const response = await request.post('/api/v0/bilan/cgo/1234', {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: {}
  });
  expect(response.status()).toBe(204);
});
