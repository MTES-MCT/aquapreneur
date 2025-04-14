import { and, eq, sql } from 'drizzle-orm';

import { db } from '$db';

import { bilans } from '$db/schema/api';
import { concessions } from '$db/schema/atena';

export const load = async ({ parent, params }) => {
  const { etablissement } = await parent();
  const { year } = params;

  const reqBilans = await db
    .select()
    .from(bilans)
    .where(
      and(
        eq(bilans.siret, etablissement.siret),
        eq(sql<string>`DATE_PART('year', ${bilans.finExercice})`, year)
      )
    );

  const reqConcessions = await db
    .select({
      idParcelle: concessions.idRcmParcelle,
      libLocalite: concessions.libLocalite,
      quartierLieuDit: concessions.quartierLieuDit,
      codeQuartierParcelle: concessions.codeQuartierParcelle,
      quartierParcelle: concessions.quartierParcelle,
      numeroParcelle: concessions.numeroParcelle,
      codeLocaliteInsee: concessions.codeLocaliteInsee,
      typeParcelle: concessions.typeParcelle,
      surfaceParcelle: concessions.surfaceParcelle,
      etatParcelle: concessions.etatParcelle,
      familleExploitation: concessions.familleExploitation,
      natureJuridique: concessions.natureJuridique,
      numArrete: concessions.numArrete,
      dateArrete: concessions.dateArrete,
      typeOccupation: concessions.typeOccupation,
      espece: concessions.espece,
      familleEspece: concessions.familleEspece
    })
    .from(concessions)
    .where(and(eq(concessions.siren, etablissement.siret.substring(0, 9))));

  return { bilan: reqBilans?.[0], concessions: reqConcessions };
};
