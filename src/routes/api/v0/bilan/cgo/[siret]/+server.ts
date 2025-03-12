import * as Sentry from '@sentry/sveltekit';
import camelcaseKeys from 'camelcase-keys';
import decamelize from 'decamelize';
import { eq } from 'drizzle-orm';
import type { ZodError } from 'zod';

import { error } from '@sveltejs/kit';

import { db } from '$db';

import { jetonsApi } from '$db/schema/auth';
import {
  bilans,
  bilansBruts,
  bilansInsertSchema,
  dirigeantEs,
  dirigeantEsInsertSchema
} from '$db/schema/bilan';

import { sha256Digest } from '$utils';

// TODO : utiliser l’algorithme de vérification complet
const siretIsValid = (siret: string) => siret.match(/^\d{14}$/);

const formatZodError = (err: ZodError) => {
  return err.issues
    .map((issue) => {
      const paths = issue.path.map((path) => decamelize(path.toString())).join(',');
      return `${paths}: ${issue.message}`;
    })
    .join('\n');
};

const getApiVersion = (url: URL): number => {
  // Les appels api sont de la forme /api/v12/<...>
  // Dans cet exemple, On veut extraire le `12`

  const matches = url.pathname.match(/^\/api\/v(\d+)\//);
  if (matches?.length) {
    return Number(matches[1]);
  }
  error(500, 'URL incorrecte');
};

export const POST = async ({ params, url, request }) => {
  // Validation des préconditions
  const { siret } = params;
  const apiVersion = getApiVersion(url);

  if (!siretIsValid(siret)) {
    error(400, 'Code SIRET de l’URL incorrect');
  }

  const bearerToken = request.headers.get('Authorization');
  if (!bearerToken) {
    error(401, 'En-tête `Authorization` absent');
  }

  if (!bearerToken.startsWith('Bearer ')) {
    error(400, 'En-tête `Authorization` incorrect. La valeur attendue est : `Bearer <YOUR TOKEN>`');
  }

  const key = bearerToken.split(' ')[1];
  if (!key) {
    error(400, 'En-tête `Authorization` incorrect. La valeur attendue est : `Bearer <YOUR TOKEN>`');
  }

  const hashedToken = sha256Digest(key);
  const req = await db.select().from(jetonsApi).where(eq(jetonsApi.hachage, hashedToken));
  if (!req.length) {
    error(401, 'Jeton d’authentification invalide');
  }

  // Parsing
  const { nomPartenaire, siretPartenaire } = req[0];

  let bilanData;
  try {
    bilanData = await request.json();
  } catch (err) {
    Sentry.captureException(err);
    error(400, 'Contenu JSON invalide');
  }

  // Sauvegarde du bilan brut
  await db.insert(bilansBruts).values({
    nomPartenaire,
    siretPartenaire,
    versionApi: apiVersion,
    bilan: bilanData
  });

  if (bilanData['siret'] !== siret) {
    error(400, 'Numéros SIRET inconsistents');
  }

  // Parsing du bilan, et écriture en BDD
  await db.transaction(async (tx) => {
    const bilanInfo = {
      siret: bilanData['siret'],
      nom: bilanData['nom'],
      debutExercice: bilanData['debut_exercice'],
      finExercice: bilanData['fin_exercice'],
      version: bilanData['version'],
      dateBilan: bilanData['date_bilan']
    };

    const flatBilan = {
      ...bilanInfo,
      ...bilanData['stock'],
      ...bilanData['production'],
      ...bilanData['destination'],
      ...bilanData['donnees_economiques']
    };

    const parsingResult = bilansInsertSchema.strict().safeParse(flatBilan);
    if (parsingResult.success === false) {
      error(400, formatZodError(parsingResult.error));
    }

    const inserted = (await tx.insert(bilans).values(parsingResult.data).returning())[0];
    if (!Array.isArray(bilanData['dirigeant_es'])) {
      error(400, 'Clé `dirigeant_es` manquantes, ou pas un tableau');
    }
    for (const dir of bilanData['dirigeant_es']) {
      const parsingResult = dirigeantEsInsertSchema.strict().safeParse({
        ...camelcaseKeys(dir),
        idBilan: inserted.id
      });
      if (!parsingResult.success) {
        error(400, formatZodError(parsingResult.error));
      }

      await tx.insert(dirigeantEs).values(parsingResult.data);
    }
  });

  return new Response(null, { status: 204 });
};
