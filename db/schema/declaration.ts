// import {
// 	boolean,
// 	integer,
// 	jsonb,
// 	pgEnum,
// 	pgTable,
// 	text,
// } from "drizzle-orm/pg-core";

// import type { Declaration } from "$lib/schemas/declaration-schema";

// import { timestamps } from ".";
// import { etablissements } from "./entreprise";

// export const auteurEnum = pgEnum("auteur", ["comptable", "producteur"]);

// // TODO: changer des noms pour éviter la confusion sur Declaration
// export const declarations = pgTable("declarations", {
// 	id: integer().primaryKey().generatedAlwaysAsIdentity(),

// 	etablissementId: text().references(() => etablissements.siret),
// 	annee: integer().notNull(), // annee de la cloture
// 	data: jsonb().$type<Declaration>().notNull(),
// 	auteur: auteurEnum(),
// 	validé: boolean().notNull(),
// 	...timestamps,
// });
