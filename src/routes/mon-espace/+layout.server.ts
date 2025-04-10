import nafRev2 from '$data/naf-rev2.json';

import { redirect } from '@sveltejs/kit';

import { SIRENE_AUTH_TOKEN } from '$env/static/private';

export const load = async ({ fetch, parent }) => {
  const { utilisateur } = await parent();

  // Cette route n’est accessible qu’aux utilisateurs connectés, et validés
  if (!utilisateur) redirect(307, '/');
  if (!utilisateur.valide) redirect(307, '/validation');

  const siret = utilisateur.siret;

  let etablissement;
  let activitePrincipale;
  if (siret) {
    const res = await fetch(`https://api.insee.fr/api-sirene/3.11/siret/${siret}`, {
      headers: {
        'x-insee-api-key-integration': SIRENE_AUTH_TOKEN
      }
    });
    const jsonRes = await res.json();
    etablissement = jsonRes.etablissement;
    const naf = etablissement.uniteLegale.activitePrincipaleUniteLegale;
    activitePrincipale = nafRev2.find((line) => line.code == naf)?.label;
  }
  // TODO log gestion d’erreur
  // - pas de siret
  // - timeout API sirene, etc.

  return {
    siret,
    etablissement,
    activitePrincipale,
    // on renvoie de nouveau l’objet utilisateur ici, au lieu de compter sur
    // celui du layout global puisque son type est maintenant plus precis
    // (non null)
    utilisateur
  };
};
