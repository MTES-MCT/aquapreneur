import { eq } from 'drizzle-orm';

import { error } from '@sveltejs/kit';

import { db } from '$db';

import { jetonsAPI } from '$db/schema/auth';
import { bilansBruts } from '$db/schema/bilan';

import { sha256Digest } from '$utils';

export const POST = async ({ request }) => {
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
  const req = await db.select().from(jetonsAPI).where(eq(jetonsAPI.hachage, hashedToken));

  if (!req.length) {
    error(401, 'Jeton d’authentification invalide');
  }

  const bilanData = await request.json();
  // On stocke le bilan brut
  await db.insert(bilansBruts).values({ bilan: bilanData });
  return new Response(null, { status: 204 });
};
