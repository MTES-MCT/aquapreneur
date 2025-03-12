import { type InferSelectModel, sql } from 'drizzle-orm';
import { check, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

import { timestampCreation, timestamps } from '.';

// Basé sur https://lucia-auth.com/sessions/basic-api/drizzle-orm
export const utilisateurs = pgTable('utilisateurs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ...timestamps,

  courriel: text()
});

export type Utilisateur = InferSelectModel<typeof utilisateurs>;

export const sessions = pgTable('sessions', {
  id: text().primaryKey(),
  ...timestampCreation,

  idUtilisateur: integer()
    .notNull()
    .references(() => utilisateurs.id, { onDelete: 'cascade' }),
  dateExpiration: timestamp({
    withTimezone: true,
    mode: 'date'
  }).notNull()
});

export type Session = InferSelectModel<typeof sessions>;

// Authentification pour l’API
export const jetonsApi = pgTable(
  'jetons_api',
  {
    hachage: text().primaryKey(),
    ...timestampCreation,

    nomPartenaire: text().notNull(),
    siretPartenaire: text().notNull(),
    courrielPartenaire: text().notNull()
  },
  (table) => [check('siret_check', sql`${table.siretPartenaire} ~ '^\\d{14}$'`)]
);

export const jetonsApiInsertSchema = createInsertSchema(jetonsApi, {
  siretPartenaire: (s) => s.regex(/^\d{14}$/, 'Le SIRET doit être composé de 14 chiffres'),
  courrielPartenaire: (schema) => schema.email().toLowerCase()
});
