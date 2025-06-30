import { type InferSelectModel, sql } from "drizzle-orm";
import { boolean, check, pgTable, text } from "drizzle-orm/pg-core";

import { timestamps } from ".";

export const entreprises = pgTable(
	"entreprises",
	{
		siren: text().primaryKey(),
		codeActivitePrincipale: text(),
		activitePrincipale: text(),
		denomination: text(),
		...timestamps,
	},
	(table) => [check("siren_check", sql`${table.siren} ~ '^\\d{9}$'`)],
);

export const etablissementsTable = pgTable(
	"etablissements",
	{
		siret: text().primaryKey(),
		siren: text()
			.references(() => entreprises.siren, {
				onDelete: "restrict",
			})
			.notNull(),
		denomination: text(),
		siege: boolean(),
		codeActivitePrincipale: text(),
		activitePrincipale: text(),
		adresse: text(),
		idAdresse: text(),
		codePostal: text(),
		codeCommune: text(),
		commune: text(),
		...timestamps,
	},
	(table) => [
		check("siret_check", sql`${table.siret} ~ '^\\d{14}$'`),
		check("siren_check", sql`${table.siren} ~ '^\\d{9}$'`),
	],
);

export type EtablissementSelect = InferSelectModel<typeof etablissementsTable>;
