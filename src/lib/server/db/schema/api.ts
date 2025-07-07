import { sql } from "drizzle-orm";
import {
	boolean,
	check,
	date,
	integer,
	json,
	jsonb,
	pgTable,
	text,
} from "drizzle-orm/pg-core";

import { type CGOData } from "$lib/schemas/cgo-schema";

import { timestampCreation, timestamps } from ".";

// Authentification pour l’API
export const jetonsApi = pgTable(
	"jetons_api",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		...timestampCreation,

		hachage: text().notNull().unique(),
		valide: boolean().notNull().default(true),
		nomPartenaire: text().notNull(),
		siretPartenaire: text().notNull(),
		courrielPartenaire: text().notNull(),
	},
	(table) => [
		check("siret_check", sql`${table.siretPartenaire} ~ '^\\d{14}$'`),
	],
);

export const evtsJournalReqs = pgTable("journal_requetes", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	idJeton: integer()
		.notNull()
		.references(() => jetonsApi.id, { onDelete: "restrict" }),
	...timestampCreation,

	versionApi: integer().notNull(),
	pathname: text().notNull(),
	href: text().notNull(),
	methode: text().notNull(),
	// On utilise une colonne json plutôt que jsonb pour rester aussi fidèles que
	// possible aux données reçues
	donnees: json().notNull(),
	statut: integer(),
});

export const bilans = pgTable(
	"bilans",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		idEvtJournalReqs: integer()
			.notNull()
			.references(() => evtsJournalReqs.id, { onDelete: "restrict" }),
		...timestamps,

		siret: text().notNull(),
		nom: text().notNull(),
		debutExercice: date().notNull(),
		finExercice: date().notNull(),
		version: integer().notNull(),
		dateBilan: date().notNull(),
		donnees: jsonb().$type<CGOData>().notNull(),
	},
	(table) => [check("siret_check", sql`${table.siret} ~ '^\\d{14}$'`)],
);
