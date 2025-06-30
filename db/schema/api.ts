import { createInsertSchema, createSelectSchema } from "drizzle-arktype";
import { type InferSelectModel, sql } from "drizzle-orm";
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
import { IsoDate } from "../../src/lib/types";

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

export const jetonsApiInsertSchema = createInsertSchema(jetonsApi, {
	siretPartenaire: (s) => s.to("string.digits == 14"),
	courrielPartenaire: (s) =>
		s.to("string.trim").to("string.email & string.lower"),
});

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
	data: json().notNull(),
	// TODO: statut
	status: integer(),
});

export type EvtJournalReqs = InferSelectModel<typeof evtsJournalReqs>;

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

export const bilansInsertSchema = createInsertSchema(bilans, {
	siret: (s) => s.to("string.digits == 14"),
	debutExercice: IsoDate,
	finExercice: IsoDate,
	dateBilan: IsoDate,
});
export type bilansInsertSchema = typeof bilansInsertSchema.infer;

export const bilansSelectSchema = createSelectSchema(bilans);
export type bilansSelectSchema = typeof bilansSelectSchema.infer;
