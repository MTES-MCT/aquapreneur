import { desc, sql } from "drizzle-orm";

import { db } from "$lib/server/db";

import "$lib/server/db/schema/entreprise";

import { declarationsTable } from "$lib/server/db/schema/declaration";
import { etablissementsTable } from "$lib/server/db/schema/entreprise";

import { getOrCreateDeclarations } from "$lib/declaration-store";

export const load = async () => {
	// TODO: ne récuperer que les exploitants assignés au comptable connecté
	const etablissements = await db.select().from(etablissementsTable);

	for (const etablissement of etablissements) {
		try {
			await getOrCreateDeclarations(etablissement);
		} catch (error) {
			// TODO: logger
			console.log(error);
		}
	}

	const declarations = await db
		.select()
		.from(declarationsTable)
		.orderBy(
			desc(declarationsTable.annee),
			// TODO : remonter etablissement.denomination
			sql`${declarationsTable.donnees}->'etablissement'->>'denomination' asc`,
		);

	return {
		declarations,
	};
};
