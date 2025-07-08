import { sql } from "drizzle-orm";
import { check, integer, jsonb, pgTable, text } from "drizzle-orm/pg-core";

import type { DeclarationSchema } from "$lib/schemas/declaration-schema";

import { timestamps } from ".";
import { etablissementsTable } from "./entreprise";

export const declarationsTable = pgTable(
	"declarations",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),

		siret: text().references(() => etablissementsTable.siret),
		annee: integer().notNull(), // annee de la cloture
		donnees: jsonb().$type<DeclarationSchema>().notNull(),
		...timestamps,
	},
	(table) => [check("siret_check", sql`${table.siret} ~ '^\\d{14}$'`)],
);
