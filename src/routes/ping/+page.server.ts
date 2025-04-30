import { error } from '@sveltejs/kit';

import { db } from '$db';

import { utilisateurs } from '$db/schema/auth';

import * as logger from '$utils/logger';

export const load = async () => {
  // On fait une requête quelconque sur la BDD pour qu’une erreur soit déclenchée
  // si elle n’est pas disponible
  try {
    await db.select().from(utilisateurs).limit(1);
  } catch (err) {
    logger.exception(err, 'La base de données n’est pas accessible');
    error(500, 'La base de données n’est pas accessible');
  }

  return { title: 'Monitorage', statusMessage: 'Aquapreneur OK' };
};
