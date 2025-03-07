import { desc } from 'drizzle-orm';
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
  await db.insert(authSchema.jetonsApi).values(values);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Tests d’autorisation
//

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

test('400 pour les en-têtes d’autorisation mal formés', async ({ request }) => {
  let response = await request.post('/api/v0/bilan/cgo/1234', {
    headers: { Authorization: `XXX` },
    data: {}
  });
  expect(response.status()).toBe(400);
  response = await request.post('/api/v0/bilan/cgo/1234', {
    headers: { Authorization: `Bearer` },
    data: {}
  });
  expect(response.status()).toBe(400);
});

test('204 en cas de succès', async ({ request }) => {
  const response = await request.post('/api/v0/bilan/cgo/1234', {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: {}
  });
  expect(response.status()).toBe(204);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Tests de sauvegarde des bilans bruts
//

test('Le bilan brut est enregistré', async ({ request }) => {
  const data = {
    foo: 'foo'
  };
  const response = await request.post('/api/v0/bilan/cgo/1234', {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data
  });
  expect(response.status()).toBe(204);
  const inserted = (
    await db
      .select()
      .from(bilanSchema.bilansBruts)
      .orderBy(desc(bilanSchema.bilansBruts.id))
      .limit(1)
  )[0];

  expect(Date.now() - inserted.dateCreation.getTime()).toBeGreaterThan(0);
  expect(Date.now() - inserted.dateCreation.getTime()).toBeLessThan(100);
  expect(inserted.nomPartenaire === 'partenaire test');
  expect(inserted.siretPartenaire === '12345678901234');
  expect(inserted.versionApi).toBe(0);
  expect(inserted.bilan).toEqual(data);
});

test('400 en l’absence de JSON dans la requête', async ({ request }) => {
  const response = await request.post('/api/v0/bilan/cgo/1234', {
    headers: { Authorization: `Bearer ${validAuthToken}` }
  });
  expect(response.status()).toBe(400);
});
