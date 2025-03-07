import { type InferSelectModel, sql } from 'drizzle-orm';
import { check, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { timestampCreation, timestamps } from '.';

// Basé sur https://lucia-auth.com/sessions/basic-api/drizzle-orm
export const utilisateurs = pgTable('utilisateurs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ...timestamps,

  courriel: text()
});

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

// Authentification pour l’API
export const jetonsApi = pgTable(
  'jetons_api',
  {
    hachage: text().primaryKey(),
    ...timestampCreation,

    nomPartenaire: text().notNull(),

    siretPartenaire: text().notNull()
  },
  (table) => [check('siret_check', sql`${table.siretPartenaire} ~ '^\\d{14}$'`)]
);

export type Utilisateur = InferSelectModel<typeof utilisateurs>;
export type Session = InferSelectModel<typeof sessions>;
