import { eq } from 'drizzle-orm';

import { error } from '@sveltejs/kit';

import { db } from '$db';

import { jetonsApi } from '$db/schema/auth';
import { bilansBruts } from '$db/schema/bilan';

import { sha256Digest } from '$utils';

const getApiVersion = (url: URL): number => {
  // Les appels api sont de la forme /api/v12/<...>
  // Dans cet exemple, On veut extraire le `12`

  const matches = url.pathname.match(/^\/api\/v(\d+)\//);
  if (matches?.length) {
    return Number(matches[1]);
  }
  throw error(500, 'URL incorrecte');
};

export const POST = async ({ url, request }) => {
  const apiVersion = getApiVersion(url);

  const bearerToken = request.headers.get('Authorization');
  if (!bearerToken) error(401, 'En-tête `Authorization` absent');
  if (!bearerToken.startsWith('Bearer '))
    throw error(
      400,
      'En-tête `Authorization` incorrect. La valeur attendue est : `Bearer <YOUR TOKEN>`'
    );
  const key = bearerToken.split(' ')[1];
  if (!key)
    throw error(
      400,
      'En-tête `Authorization` incorrect. La valeur attendue est : `Bearer <YOUR TOKEN>`'
    );

  const hashedToken = sha256Digest(key);
  const req = await db.select().from(jetonsApi).where(eq(jetonsApi.hachage, hashedToken));

  if (!req.length) {
    error(401, 'Jeton d’authentification invalide');
  }

  const { nomPartenaire, siretPartenaire } = req[0];
  console.log(nomPartenaire, siretPartenaire);

  let bilanData;
  try {
    bilanData = await request.json();
  } catch (err) {
    console.log('error', err);
    error(400, 'Contenu JSON invalide');
  }

  // On stocke le bilan brut
  await db.insert(bilansBruts).values({
    nomPartenaire,
    siretPartenaire,
    versionApi: apiVersion,
    bilan: bilanData
  });
  return new Response(null, { status: 204 });
};
