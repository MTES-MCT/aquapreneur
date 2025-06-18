import { type } from "arktype";
import { and, eq, sql } from "drizzle-orm";

import { error, redirect } from "@sveltejs/kit";

import { db } from "$db";

import { bilans, bilansSelectSchema } from "$db/schema/api";
import { concessions } from "$db/schema/atena";

import * as logger from "$utils/logger";

export const load = async ({ parent, params }) => {
	const { etablissement } = await parent();
	const { year } = params;

	let bilan: bilansSelectSchema | null = null;

	if (!etablissement) {
		redirect(307, "/votre-espace");
	}

	// On vérifie que la valeur renvoyée de la BDD est bien un `bilansSelectSchema`
	// pour s’assurer que le champ jsonb `donnees` à bien la forme attendue
	const reqBilans = await db
		.select()
		.from(bilans)
		.where(
			and(
				eq(bilans.siret, etablissement.siret),
				eq(sql<string>`DATE_PART('year', ${bilans.finExercice})`, year),
			),
		);

	if (reqBilans.length > 1) {
		logger.error("Bilans multiples");
		error(500, "Bilans multiples");
	}

	if (reqBilans.length === 1) {
		const reqBilan = reqBilans[0];
		const bilan2 = bilansSelectSchema(reqBilan);

		if (bilan2 instanceof type.errors) {
			logger.error(bilan2.summary);
			error(500, bilan2.summary);
		}

		bilan = bilan2;
	}

	const reqConcessions = await db
		.select({
			lieu: sql<string>`concat(${concessions.libLocalite} ,  ' – ', ${concessions.nomLieuDit})`,
			idParcelle: concessions.idRcmParcelle,
			libLocalite: concessions.libLocalite,
			nomLieuDit: concessions.nomLieuDit,
			quartierParcelle: concessions.quartierParcelle,
			numeroParcelle: concessions.numeroParcelle,
			codeLocaliteInsee: concessions.codeLocaliteInsee,
			typeParcelle: concessions.typeParcelle,
			nomSituation: concessions.nomSituation,
			surfaceParcelle: concessions.surfaceParcelle,
			uniteMesure: concessions.uniteMesure,
			etatParcelle: concessions.etatParcelle,
			familleExploitation: concessions.familleExploitation,
			exploitation: concessions.exploitation,
			natureJuridique: concessions.natureJuridique,
			numArrete: concessions.numArrete,
			dateArrete: concessions.dateArrete,
			typeOccupation: concessions.typeOccupation,
			espece: concessions.espece,
			familleEspece: concessions.familleEspece,
		})
		.from(concessions)
		.where(and(eq(concessions.siren, etablissement.siret.substring(0, 9))))
		.orderBy(
			concessions.quartierParcelle,
			concessions.libLocalite,
			concessions.nomLieuDit,
			concessions.numeroParcelle,
		);

	return {
		bilan,
		concessions: reqConcessions,
		// On rexporte `etablissement` pour propager son narrowing
		// (on sait maintenant qu’il n’est pas null)
		etablissement,
	};
};
