import { wrapServerRouteWithSentry } from '@sentry/sveltekit';
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

import audit from '$utils/audit';
import * as logger from '$utils/logger';

import cgoMapping from './cgo-mapping.json';

// TODO : utiliser l’algorithme de vérification complet
const siretIsValid = (siret: string | undefined) => siret && siret.match(/^\d{14}$/);

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

export const POST = wrapServerRouteWithSentry(async ({ params, url, request }) => {
  // Validation des préconditions
  const { siret } = params;
  const apiVersion = getApiVersion(url);

  const bearerToken = request.headers.get('Authorization');
  if (!bearerToken) {
    audit('Jeton manquant');

    error(401, 'En-tête `Authorization` absent');
  }

  if (!bearerToken.startsWith('Bearer ')) {
    audit('En-tête `Authorization` incorrect');

    error(400, 'En-tête `Authorization` incorrect. La valeur attendue est : `Bearer <YOUR TOKEN>`');
  }

  const key = bearerToken.split(' ')[1];
  if (!key) {
    audit('En-tête `Authorization` incorrect');

    error(400, 'En-tête `Authorization` incorrect. La valeur attendue est : `Bearer <YOUR TOKEN>`');
  }

  const jeton = await getJetonApiFromToken(key);

  if (!jeton) {
    audit('Utilisation d’un jeton invalide');

    error(401, 'Jeton d’authentification invalide');
  }

  if (!jeton.valide) {
    audit('Utilisation d’un jeton désactivé');

    error(401, 'Jeton d’authentification désactivé');
  }
  // Parsing
  let bilanData;
  try {
    bilanData = await request.json();
  } catch (err) {
    logger.exception(err, 'Error de lecture du JSON', { api_token_id: jeton.id });
    // TODO ajouter une requête d’audit ?
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

  audit('Requête d’audit sauvegardée', {
    request_log_id: auditLogEntry.id,
    api_token_id: jeton.id
  });
  let bilan: typeof bilans.$inferSelect | undefined;
  try {
    if (!siretIsValid(siret)) {
      error(400, 'Code SIRET de l’URL incorrect');
    }

    if (bilanData['siret'] !== siret) {
      error(400, 'Numéros SIRET inconsistents');
    }

    // Parsing du bilan, et écriture en BDD
    await db.transaction(async (tx) => {
      Object.keys(bilanData).forEach((key) => {
        if (
          ![
            'siret',
            'nom',
            'debut_exercice',
            'fin_exercice',
            'version',
            'date_bilan',
            'dirigeant_es',
            'stock',
            'production',
            'destination',
            'donnees_economiques'
          ].includes(key)
        ) {
          error(400, `Clé \`${key}\` inconnue`);
        }
      });

      const bilanInfo = {
        siret: bilanData['siret'],
        nom: bilanData['nom'],
        debutExercice: bilanData['debut_exercice'],
        finExercice: bilanData['fin_exercice'],
        version: bilanData['version'],
        dateBilan: bilanData['date_bilan']
      };

      const renameFields = (
        data: Record<string, object>,
        category: string
      ): Record<string, object> => {
        if (!data) error(400, `Clé \`${category}\` manquante`);
        const converted: Record<string, object> = {};

        Object.keys(data).forEach((oldKey) => {
          if (Object.hasOwn(cgoMapping, oldKey)) {
            // @ts-expect-error TODO typage à préciser
            const newKey = cgoMapping[oldKey];
            converted[newKey] = data[oldKey];
          } else {
            converted[oldKey] = data[oldKey];
          }
        });
        return converted;
      };

      const flatBilan = {
        idEvtJournalReqs: auditLogEntry.id,
        ...bilanInfo,
        ...renameFields(bilanData['stock'], 'stock'),
        ...renameFields(bilanData['production'], 'production'),
        ...renameFields(bilanData['donnees_economiques'], 'donnees_economiques')
      };

      const parsingResult = bilansInsertSchema.strict().safeParse(flatBilan);
      if (parsingResult.success === false) {
        error(400, formatZodError(parsingResult.error));
      }

      bilan = (await tx.insert(bilans).values(parsingResult.data).returning())[0];

      if (!Array.isArray(bilanData['dirigeant_es'])) {
        error(400, 'Clé `dirigeant_es` manquantes, ou pas un tableau');
      }
      for (const dir of bilanData['dirigeant_es']) {
        const parsingResult = dirigeantEsInsertSchema.strict().safeParse({
          ...camelcaseKeys(dir),
          idBilan: bilan.id
        });
        if (!parsingResult.success) {
          error(400, formatZodError(parsingResult.error));
        }

        await tx.insert(dirigeantEs).values(parsingResult.data);
      }
    });
    await setLogEntryStatus(auditLogEntry, 204);

    audit('Envoi de bilan réussi', {
      request_log_id: auditLogEntry.id,
      bilan_id: bilan?.id,
      api_token_id: jeton.id
    });

    return new Response(null, { status: 204 });
  } catch (err) {
    if (isHttpError(err)) {
      await setLogEntryStatus(auditLogEntry, err.status);

      audit(
        'Erreur HTTP lors d’un envoi de bilan',
        { request_log_id: auditLogEntry.id, api_token_id: jeton.id },
        err
      );
      throw err;
    }
    await setLogEntryStatus(auditLogEntry, 500);
    logger.exception(err, 'Error de sauvegarde du bilan', {
      request_log_id: auditLogEntry.id,
      api_token_id: jeton.id
    });

    audit(
      'Erreur lors d’un envoi de bilan',
      { request_log_id: auditLogEntry.id, api_token_id: jeton.id },
      err
    );

    throw err;
  }
});
