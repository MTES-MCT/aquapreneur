import { eq, getTableColumns, sql } from "drizzle-orm";

import { db } from "$lib/server/db";

import "$lib/server/db/schema/entreprise";

import { declarationsTable } from "$lib/server/db/schema/declaration";
import { etablissementsTable } from "$lib/server/db/schema/entreprise";
import { getOrCreateDeclarations } from "$lib/server/declaration-store";
import * as logger from "$lib/server/utils/logger";

export const load = async () => {
	// TODO: ne récuperer que les exploitants assignés au comptable connecté
	const etablissements = await db.select().from(etablissementsTable);

	for (const etablissement of etablissements) {
		try {
			await getOrCreateDeclarations(etablissement);
		} catch (err) {
			logger.error("Impossible de créer les déclarations", {
				siret: etablissement.siret,
				err,
			});
		}
	}

	const sq = db.$with("sq").as(
		db
			.select({
				...getTableColumns(declarationsTable),
				rank: sql<number>`row_number() over (partition by ${declarationsTable.siret} order by ${declarationsTable.annee} desc)`.as(
					"rank",
				),
			})
			.from(declarationsTable),
	);
	const declarations = await db
		.with(sq)
		.select()
		.from(sq)
		.where(eq(sq.rank, 1));

	return {
		declarations,
	};
};
