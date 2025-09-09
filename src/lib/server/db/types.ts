import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { IsoDate, Siret } from "$lib/types";

import { bilans, evtsJournalReqs, jetonsApi } from "./schema/api";

import type { InferSelectModel } from "drizzle-orm";

import type { concessionsTable } from "./schema/atena";
import type { sessions, utilisateurs } from "./schema/auth";
import type { declarationsTable } from "./schema/declaration";
import type { etablissementsTable } from "./schema/entreprise";

export const bilansInsertSchema = createInsertSchema(bilans, {
	siret: Siret,
	debutExercice: IsoDate,
	finExercice: IsoDate,
	dateBilan: z.iso.date(),
});
export type bilansInsertSchema = z.infer<typeof bilansInsertSchema>;

export const bilansSelectSchema = createSelectSchema(bilans);
export type bilansSelectSchema = z.infer<typeof bilansSelectSchema>;

export type EvtJournalReqs = InferSelectModel<typeof evtsJournalReqs>;

export const jetonsApiInsertSchema = createInsertSchema(jetonsApi, {
	siretPartenaire: Siret,
	courrielPartenaire: z.string().trim().toLowerCase(),
});

export type ConcessionSelect = typeof concessionsTable.$inferSelect;

export type Utilisateur = InferSelectModel<typeof utilisateurs>;

export type Session = InferSelectModel<typeof sessions>;

export type DeclarationEntry = typeof declarationsTable.$inferSelect;
export type DeclarationEntryInsert = typeof declarationsTable.$inferInsert;

export type EtablissementSelect = InferSelectModel<typeof etablissementsTable>;
