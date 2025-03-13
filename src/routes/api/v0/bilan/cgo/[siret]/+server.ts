import * as Sentry from '@sentry/sveltekit';
import camelcaseKeys from 'camelcase-keys';
import { eq } from 'drizzle-orm';

import { error, isHttpError } from '@sveltejs/kit';

import { db } from '$db';

import {
  type EvtJournalReqs,
  bilans,
  bilansInsertSchema,
  dirigeantEs,
  dirigeantEsInsertSchema,
  evtsJournalReqs
} from '$db/schema/api';
import { getJetonApiFromToken } from '$db/utils';

import { formatZodError } from '$utils';

// TODO : utiliser l’algorithme de vérification complet
const siretIsValid = (siret: string) => siret.match(/^\d{14}$/);

const getApiVersion = (url: URL): number => {
  // Les appels api sont de la forme /api/v12/<...>
  // Dans cet exemple, On veut extraire le `12`

  const matches = url.pathname.match(/^\/api\/v(\d+)\//);
  if (matches?.length) {
    return Number(matches[1]);
  }
  error(500, 'URL incorrecte');
};

const setLogEntryStatus = async (logEntry: EvtJournalReqs, status: number) => {
  await db.update(evtsJournalReqs).set({ status }).where(eq(evtsJournalReqs.id, logEntry.id));
};

export const POST = async ({ params, url, request }) => {
  // Validation des préconditions
  const { siret } = params;
  const apiVersion = getApiVersion(url);

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

  const jeton = await getJetonApiFromToken(key);

  if (!jeton) {
    error(401, 'Jeton d’authentification invalide');
  }

  if (!jeton.valide) {
    error(401, 'Jeton d’authentification désactivé');
  }
  // Parsing
  let bilanData;
  try {
    bilanData = await request.json();
  } catch (err) {
    console.error(err);
    Sentry.captureException(err);
    error(400, 'Contenu JSON invalide');
  }

  // Sauvegarde de la requête pour audit
  const auditLogEntry = (
    await db
      .insert(evtsJournalReqs)
      .values({
        idJeton: jeton.id,
        versionApi: apiVersion,
        href: url.href,
        pathname: url.pathname,
        methode: request.method,
        data: bilanData
      })
      .returning()
  )[0];

  try {
    if (!siretIsValid(siret)) {
      error(400, 'Code SIRET de l’URL incorrect');
    }

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
        idEvtJournalReqs: auditLogEntry.id,
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
    await setLogEntryStatus(auditLogEntry, 204);
    return new Response(null, { status: 204 });
  } catch (err) {
    if (isHttpError(err)) {
      await setLogEntryStatus(auditLogEntry, err.status);
      throw err;
    }
    console.error(err);
    Sentry.captureException(err);
    await setLogEntryStatus(auditLogEntry, 500);
    throw err;
  }
};
