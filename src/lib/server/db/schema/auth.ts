import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

import { timestampCreation, timestamps } from ".";

// Basé sur https://lucia-auth.com/sessions/basic-api/drizzle-orm
export const utilisateurs = pgTable("utilisateurs", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	...timestamps,

	idProConnect: text().notNull().unique(),
	courriel: text().notNull().unique(),
	prenom: text().notNull(),
	nom: text().notNull(),
	siret: text().notNull(),
	telephone: text(),

	derniereConnexion: timestamp({ withTimezone: true, mode: "date" }),
	dernierAcces: timestamp({ withTimezone: true, mode: "date" }),

	valide: boolean().default(false),
	estAdmin: boolean().default(false),
});

export const sessions = pgTable("sessions", {
	id: text().primaryKey(),
	idUtilisateur: integer()
		.notNull()
		.references(() => utilisateurs.id, { onDelete: "cascade" }),
	...timestampCreation,

	dateExpiration: timestamp({
		withTimezone: true,
		mode: "date",
	}).notNull(),
});
