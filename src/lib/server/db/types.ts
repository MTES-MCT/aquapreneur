import { createInsertSchema, createSelectSchema } from "drizzle-arktype";
import type { InferSelectModel } from "drizzle-orm";

import { IsoDate } from "$lib/types";

import { bilans, evtsJournalReqs, jetonsApi } from "./schema/api";
import type { concessionsTable } from "./schema/atena";
import type { sessions, utilisateurs } from "./schema/auth";
import type { declarationsTable } from "./schema/declaration";
import type { etablissementsTable } from "./schema/entreprise";

export const bilansInsertSchema = createInsertSchema(bilans, {
	siret: (s) => s.to("string.digits == 14"),
	debutExercice: IsoDate,
	finExercice: IsoDate,
	dateBilan: IsoDate,
});
export type bilansInsertSchema = typeof bilansInsertSchema.infer;

export const bilansSelectSchema = createSelectSchema(bilans);
export type bilansSelectSchema = typeof bilansSelectSchema.infer;

export type EvtJournalReqs = InferSelectModel<typeof evtsJournalReqs>;

export const jetonsApiInsertSchema = createInsertSchema(jetonsApi, {
	siretPartenaire: (s) => s.to("string.digits == 14"),
	courrielPartenaire: (s) =>
		s.to("string.trim").to("string.email & string.lower"),
});

export type ConcessionSelect = typeof concessionsTable.$inferSelect;

export type Utilisateur = InferSelectModel<typeof utilisateurs>;

export type Session = InferSelectModel<typeof sessions>;

export type DeclarationEntry = typeof declarationsTable.$inferSelect;
export type DeclarationEntryInsert = typeof declarationsTable.$inferInsert;

export type EtablissementSelect = InferSelectModel<typeof etablissementsTable>;
