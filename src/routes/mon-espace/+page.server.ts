import { asc, inArray, sql } from 'drizzle-orm';

import { fail } from '@sveltejs/kit';

import { TMP_ALLOWED_SIRENS } from '$env/static/private';

import { db } from '$db';

import { bilans } from '$db/schema/api';

import { ADMIN_CURRENT_SIRET_COOKIE_NAME } from '$lib/constants';

export const load = async ({ parent }) => {
  const { utilisateur } = await parent();
  let exploitants;
  if (utilisateur.estAdmin) {
    exploitants = await db
      .selectDistinct({ siret: bilans.siret, nom: bilans.nom })
      .from(bilans)
      .where(
        inArray(sql<string>`substring(${bilans.siret} from 1 for 9)`, TMP_ALLOWED_SIRENS.split(','))
      )
      .orderBy(asc(bilans.nom));
  }

  return {
    exploitants
  };
};

export const actions = {
  default: async ({ request, cookies, locals }) => {
    if (!locals.utilisateur?.estAdmin) {
      // TODO: ajouter test e2e
      return fail(403);
    }
    const data = await request.formData();
    const siret = data.get('select') ?? '';
    if (siret) {
      cookies.set(ADMIN_CURRENT_SIRET_COOKIE_NAME, siret as string, { path: '/' });
    }
    return { siret };
  }
};
