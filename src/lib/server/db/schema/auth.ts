import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { type InferSelectModel } from 'drizzle-orm';

// Basé sur https://lucia-auth.com/sessions/basic-api/drizzle-orm
export const utilisateurs = pgTable('utilisateurs', {
  id: uuid().primaryKey().defaultRandom(),
  courriel: text()
});

export const sessions = pgTable('sessions', {
  id: text().primaryKey(),
  idUtilisateur: uuid()
    .notNull()
    .references(() => utilisateurs.id, { onDelete: 'cascade' }),
  dateExpiration: timestamp({
    withTimezone: true,
    mode: 'date'
  }).notNull()
});

export type Utilisateur = InferSelectModel<typeof utilisateurs>;
export type Session = InferSelectModel<typeof sessions>;
