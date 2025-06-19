import { type InferSelectModel } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

import { timestamps } from ".";

export const entreprise = pgTable("entreprises", {
	siren: text().primaryKey(),
	...timestamps,
	// TODO : remplir les données via SIRENE
});

export const etablissements = pgTable("etablissements", {
	siret: text().primaryKey(),
	siren: text().references(() => entreprise.siren),
	// TODO : remplir les données via SIRENE

	...timestamps,
});

export type Etablissement = InferSelectModel<typeof etablissements>;
