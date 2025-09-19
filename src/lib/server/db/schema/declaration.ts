import { sql } from "drizzle-orm";
import {
	check,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	text,
	unique,
} from "drizzle-orm/pg-core";

import type { DeclarationSchema } from "$lib/schemas/declaration-schema";

import { timestamps } from ".";
import { etablissementsTable } from "./entreprise";

export const declarationTypeEnum = pgEnum(
	"declaration_type",
	// DECLARATION_TYPES in $lib/constants, mais on ne peut pas l’importer ici
	["api", "comptable", "producteur"],
);

export const declarationsTable = pgTable(
	"declarations",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),

		siret: text().references(() => etablissementsTable.siret),
		annee: integer().notNull(), // annee de la cloture
		denomination: text().notNull(),
		donnees: jsonb().$type<DeclarationSchema>().notNull(),
		type: declarationTypeEnum().notNull(),

		...timestamps,
	},
	(table) => [
		check("siret_check", sql`${table.siret} ~ '^\\d{14}$'`),
		unique().on(table.siret, table.annee, table.type),
	],
);
