import { and, inArray, isNotNull, sql } from "drizzle-orm";

import { env } from "$env/dynamic/private";

import { db } from "$lib/server/db";

import "$lib/server/db/schema/entreprise";

import { declarationsTable } from "$lib/server/db/schema/declaration";
import { etablissementsTable } from "$lib/server/db/schema/entreprise";

export const load = async () => {
	// TODO: ne récuperer que les exploitants assignés au comptable connecté
	const etablissements = await db
		.select()
		.from(etablissementsTable)
		.where(
			and(
				env.TMP_ALLOWED_SIRENS ?
					inArray(
						sql<string>`substring(${etablissementsTable.siret} from 1 for 9)`,
						env.TMP_ALLOWED_SIRENS.split(","),
					)
				:	isNotNull(etablissementsTable.siret),
			),
		);

	const declarations = await db
		.select()
		.from(declarationsTable)
		.where(
			inArray(
				declarationsTable.siret,
				etablissements.map((e) => e.siret),
			),
		);

	return {
		etablissements,
		declarations,
	};
};
