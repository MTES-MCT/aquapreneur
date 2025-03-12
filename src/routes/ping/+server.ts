import * as Sentry from '@sentry/sveltekit';

import { db } from '$db';

import { utilisateurs } from '$db/schema/auth';

export const GET = async () => {
  // On fait une requête quelconque sur la BDD pour qu’une erreur soit déclenchée
  // si elle n’est pas disponible
  try {
    await db.select().from(utilisateurs).limit(1);
  } catch (err) {
    Sentry.captureException(err);
    return new Response('La base de données n’est pas accessible');
  }
  return new Response('Aquapreneur OK');
};
