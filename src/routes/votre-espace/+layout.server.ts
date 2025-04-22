import nafRev2 from '$data/naf-rev2.json';

import { redirect } from '@sveltejs/kit';

import { SIRENE_AUTH_TOKEN } from '$env/static/private';

import * as logger from '$utils/logger';

import { ADMIN_CURRENT_SIRET_COOKIE_NAME } from '$lib/constants';

export const load = async ({ fetch, parent, cookies, route }) => {
  const { utilisateur } = await parent();

  // Cette route n’est accessible qu’aux utilisateurs connectés, et validés
  if (!utilisateur) redirect(307, '/');
  if (!utilisateur.valide) redirect(307, '/validation');

  let siret;
  // Pour les administrateurs, leur propre siret n’est pas pertinent, on utilise
  // celui qui a été éventuellement choisi manuellement et stocké dans le cookie
  // `ADMIN_CURRENT_SIRET_COOKIE_NAME`
  if (utilisateur.estAdmin) {
    siret = cookies.get(ADMIN_CURRENT_SIRET_COOKIE_NAME) ?? null;
  } else {
    siret = utilisateur.siret;
  }

  let etablissement;
  let activitePrincipale: string | null = null;
  let sireneError = false;
  if (siret) {
    logger.info('Appel à l’API INSEE');
    let res: Response | null = null;
    try {
      res = await fetch(`https://api.insee.fr/api-sirene/3.11/siret/${siret}`, {
        headers: {
          'x-insee-api-key-integration': SIRENE_AUTH_TOKEN
        }
      });
    } catch (err) {
      logger.exception(err, 'Impossible de contacter l’API Sirene');
    }
    if (!res || !res.ok) {
      etablissement = null;
      activitePrincipale = null;
      sireneError = true;
    } else {
      const jsonRes = await res.json();
      etablissement = jsonRes.etablissement;
      // TODO: passer par un schema Zod
      const naf = etablissement?.uniteLegale.activitePrincipaleUniteLegale;
      activitePrincipale = nafRev2.find((line) => line.code == naf)?.label ?? null;
    }
  }

  if (!etablissement && route.id != '/votre-espace') {
    redirect(307, '/votre-espace');
  }
  // TODO log gestion d’erreur
  // - pas de siret
  // - timeout API sirene, etc.
  return {
    siret,
    sireneError,
    etablissement,
    activitePrincipale,
    // on renvoie de nouveau l’objet utilisateur ici, au lieu de compter sur
    // celui du layout global puisque son type est maintenant plus precis
    // (non null)
    utilisateur
  };
};
