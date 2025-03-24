import { db } from '$db';

import { utilisateurs } from '$db/schema/auth';

import * as logger from '$utils/logger';

export const GET = async () => {
  // On fait une requête quelconque sur la BDD pour qu’une erreur soit déclenchée
  // si elle n’est pas disponible
  try {
    await db.select().from(utilisateurs).limit(1);
  } catch (err) {
    logger.exception(err, 'La base de données n’est pas accessible');
    return new Response('La base de données n’est pas accessible', { status: 500 });
  }
  return new Response('Aquapreneur OK');
};
