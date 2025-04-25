import { Column, desc } from 'drizzle-orm';
import type { AnyPgTable } from 'drizzle-orm/pg-core';
import { reset } from 'drizzle-seed';

import { expect, test } from '@playwright/test';

import { db } from '$db';

import { bilans, dirigeantEs, evtsJournalReqs, jetonsApi } from '$db/schema/api';
import { sessions, utilisateurs } from '$db/schema/auth';
import { getJetonApiFromToken } from '$db/utils';

import { generateApiToken } from '$utils';

////////////////////////////////////////////////////////////////////////////////////////////////////
// Tests e2e de l’API
//
// doc : https://playwright.dev/docs/api-testing
// exemples dans le dépot SvelteKit :
// https://github.com/sveltejs/kit/blob/main/packages/kit/test/apps/basics/test/server.test.js

let validAuthToken: string;

async function getLastById<T extends AnyPgTable>(table: T) {
  if ('id' in table) {
    const id = table.id as Column;
    //@ts-expect-error TODO: corriger le type de `table`
    return (await db.select().from(table).orderBy(desc(id)).limit(1))[0];
  } else {
    throw Error('This table doesn’t have an `id` field');
  }
}

const dummySiret = '12345678901234';
const dummyBilan = {
  siret: dummySiret,
  nom: 'producteur',
  debut_exercice: '2020-01-01',
  fin_exercice: '2020-12-31',
  version: 1,
  date_bilan: '2021-05-01',
  dirigeant_es: [
    {
      nom: 'nom',
      prenom: 'prenom'
    }
  ]
};

test.beforeAll(async () => {
  // On veut être certain de travailler sur une base de test
  if (!db.$client.options.database.includes('-test')) {
    console.error(`Base de donnée utilisée : ${db.$client.options.database}`);
    throw new Error('Les tests doivent utiliser une BDD dédiée');
  }
  // Remise à zero de la DBB de test
  await reset(db, {
    bilans,
    dirigeantEs,
    jetonsApi,
    journalRequetes: evtsJournalReqs,
    sessions,
    utilisateurs
  });

  // Génération d’un token d’authentification
  const { token, digest } = generateApiToken();
  validAuthToken = token;
  const values = {
    hachage: digest,
    nomPartenaire: 'partenaire test',
    siretPartenaire: '12345678901234',
    courrielPartenaire: 'test@test.com'
  };
  await db.insert(jetonsApi).values(values);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Tests d’autorisation
//

test('401 pour les requêtes non authentifiées', async ({ request }) => {
  const response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    data: dummyBilan
  });
  expect(response.status()).toBe(401);
  expect((await response.json()).message).toBe('En-tête `Authorization` absent');
});

test('401 pour les jetons inexistants', async ({ request }) => {
  const response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer XXX` },
    data: dummyBilan
  });
  expect(response.status()).toBe(401);
  expect((await response.json()).message).toBe('Jeton d’authentification invalide');
});

test('401 pour les jetons desactivés', async ({ request }) => {
  const { token, digest } = generateApiToken();
  const disabledAuthToken = token;
  const values = {
    hachage: digest,
    nomPartenaire: 'partenaire test',
    siretPartenaire: '12345678901234',
    courrielPartenaire: 'test@test.com',
    valide: false
  };
  await db.insert(jetonsApi).values(values);

  const response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${disabledAuthToken}` },
    data: dummyBilan
  });
  expect(response.status()).toBe(401);
  expect((await response.json()).message).toBe('Jeton d’authentification désactivé');
});

test('400 pour les en-têtes d’autorisation mal formés', async ({ request }) => {
  let response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `XXX` },
    data: dummyBilan
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe(
    'En-tête `Authorization` incorrect. La valeur attendue est : `Bearer <YOUR TOKEN>`'
  );

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer` },
    data: dummyBilan
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe(
    'En-tête `Authorization` incorrect. La valeur attendue est : `Bearer <YOUR TOKEN>`'
  );
});

test('204 en cas de succès', async ({ request }) => {
  const response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: dummyBilan
  });
  expect(response.status()).toBe(204);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Tests de sauvegarde du journal de requêtes
//

test('Une entrée est ajoutée au journal de requêtes', async ({ request }) => {
  const response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: dummyBilan
  });
  expect(response.status()).toBe(204);

  const inserted = await getLastById(evtsJournalReqs);
  const jeton = await getJetonApiFromToken(validAuthToken);
  expect(jeton).not.toBeNull();
  expect(jeton!.valide).toBe(true);

  expect(inserted.idJeton).toBe(jeton!.id);
  expect(inserted.versionApi).toBe(0);
  expect(inserted.pathname).toBe(`/api/v0/bilan/cgo/${dummySiret}`);
  expect(inserted.href).toBe(response.url());
  expect(inserted.methode).toBe('POST');
  expect(inserted.data).toEqual(dummyBilan);
  expect(inserted.status).toBe(204);
  expect(Date.now() - inserted.dateCreation.getTime()).toBeGreaterThan(0);
  expect(Date.now() - inserted.dateCreation.getTime()).toBeLessThan(100);
});

test('Une entrée est ajoutée au journal de requêtes, même si la requête échoue', async ({
  request
}) => {
  const response = await request.post(`/api/v0/bilan/cgo/123`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, siret: '123' }
  });
  expect(response.status()).toBe(400);

  const inserted = await getLastById(evtsJournalReqs);
  const jeton = await getJetonApiFromToken(validAuthToken);
  expect(jeton).not.toBeNull();
  expect(jeton!.valide).toBe(true);

  expect(inserted.idJeton).toBe(jeton!.id);
  expect(inserted.versionApi).toBe(0);
  expect(inserted.pathname).toBe(`/api/v0/bilan/cgo/123`);
  expect(inserted.href).toBe(response.url());
  expect(inserted.methode).toBe('POST');
  expect(inserted.data).toEqual({ ...dummyBilan, siret: '123' });
  expect(inserted.status).toBe(400);
  expect(Date.now() - inserted.dateCreation.getTime()).toBeGreaterThan(0);
  expect(Date.now() - inserted.dateCreation.getTime()).toBeLessThan(100);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Tests de validation du SIRET
//

test('400 si le siret de l’URL est invalide', async ({ request }) => {
  let response;
  const invalidSiretTooShort = '123';
  const invalidSiretNotNumeric = 'ABC12345678904';

  response = await request.post(`/api/v0/bilan/cgo/${invalidSiretTooShort}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, invalidSiretTooShort }
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('Code SIRET de l’URL incorrect');

  response = await request.post(`/api/v0/bilan/cgo/${invalidSiretNotNumeric}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, invalidSiretNotNumeric }
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('Code SIRET de l’URL incorrect');
});

test('400 si les sirets ne sont pas consistents', async ({ request }) => {
  let response;
  const siret1 = '00000000000000';
  const siret2 = '12345678901234';

  response = await request.post(`/api/v0/bilan/cgo/${siret1}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, siret: siret1 }
  });

  expect(response.status()).toBe(204);

  response = await request.post(`/api/v0/bilan/cgo/${siret1}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, siret: siret2 }
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('Numéros SIRET inconsistents');
});

test('400 en l’absence de JSON dans la requête', async ({ request }) => {
  const response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` }
  });
  expect(response.status()).toBe(400);
});

test('Vérification du siret', async ({ request }) => {
  let siret = '12345678';
  let response = await request.post(`/api/v0/bilan/cgo/${siret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: {
      ...dummyBilan,
      siret
    }
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('Code SIRET de l’URL incorrect');

  siret = 'abcdefghijklmn';
  expect(siret.length === 14);
  response = await request.post(`/api/v0/bilan/cgo/${siret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: {
      ...dummyBilan,
      siret
    }
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('Code SIRET de l’URL incorrect');

  siret = '12345678901234';
  response = await request.post(`/api/v0/bilan/cgo/${siret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: {
      ...dummyBilan,
      siret
    }
  });
  expect(response.status()).toBe(204);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Tests de validation des champs numériques

test('204 si un champ monétaire est manquant', async ({ request }) => {
  let response;
  let inserted;

  // on s’assure que la clé qu’on teste n’existe pas dans les données de test
  expect('stock' in dummyBilan).toBeFalsy();

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, stock: {} }
  });
  expect(response.status()).toBe(204);
  inserted = await getLastById(bilans);
  expect(inserted['stock__huitre__nais_mil__val']).toBeNull();

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, stock: { stock__huitre__nais_mil__val: null } }
  });
  expect(response.status()).toBe(204);
  inserted = await getLastById(bilans);
  expect(inserted['stock__huitre__nais_mil__val']).toBeNull();

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, stock: { stock__huitre__nais_mil__val: undefined } }
  });
  expect(response.status()).toBe(204);
  inserted = await getLastById(bilans);
  expect(inserted['stock__huitre__nais_mil__val']).toBeNull();

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, stock: { stock__huitre__nais_mil__val: '' } }
  });
  expect(response.status()).toBe(204);
  inserted = await getLastById(bilans);
  expect(inserted['stock__huitre__nais_mil__val']).toBeNull();
});

test('204 si un champ monétaire est un nombre', async ({ request }) => {
  let response;
  let inserted;

  // On autorise à la fois les chaine de caractère et les nombres

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, stock: { stock__huitre__nais_mil__val: '12345.67' } }
  });
  expect(response.status()).toBe(204);
  inserted = await getLastById(bilans);
  expect(inserted['stock__huitre__nais_mil__val']).toBe('12345.67');

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, stock: { stock__huitre__nais_mil__val: 12345.67 } }
  });
  expect(response.status()).toBe(204);
  inserted = await getLastById(bilans);
  expect(inserted['stock__huitre__nais_mil__val']).toBe('12345.67');
});

test('400 si un champ monétaire est invalide', async ({ request }) => {
  const response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, stock: { stock__huitre__nais_mil__val: 'ABC' } }
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('stock__huitre__nais_mil__val: Invalid input');
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Tests de validation des champs dirigeant_es

test('400 si le champ dirigeant_es n’est pas un tableau', async ({ request }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dirigeant_es, ...dummyBilanNoDir } = dummyBilan;
  let response;

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: dummyBilanNoDir
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('Clé `dirigeant_es` manquantes, ou pas un tableau');

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilanNoDir, dirigeant_es: 'notAnArray' }
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('Clé `dirigeant_es` manquantes, ou pas un tableau');

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilanNoDir, dirigeant_es: [] }
  });
  expect(response.status()).toBe(204);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Tests de validation des champs date

test('400 si un champ date n’est pas au bon format', async ({ request }) => {
  let response;

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, debut_exercice: '' }
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('debut_exercice: Invalid date');

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, debut_exercice: null }
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('debut_exercice: Expected string, received null');

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, debut_exercice: undefined }
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('debut_exercice: Required');

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, debut_exercice: '12/31/2020' }
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('debut_exercice: Invalid date');

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, debut_exercice: '31/12/2020' }
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('debut_exercice: Invalid date');

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, debut_exercice: '2020-31-12' }
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).message).toBe('debut_exercice: Invalid date');

  response = await request.post(`/api/v0/bilan/cgo/${dummySiret}`, {
    headers: { Authorization: `Bearer ${validAuthToken}` },
    data: { ...dummyBilan, debut_exercice: '2020-12-31' }
  });
  expect(response.status()).toBe(204);
});
