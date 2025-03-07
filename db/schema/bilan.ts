import { sql } from 'drizzle-orm';
import { check, date, integer, json, pgTable, smallint, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

import { timestampCreation, timestamps } from '.';

export const bilansBruts = pgTable(
  'bilans_bruts',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    ...timestampCreation,
    nomPartenaire: text().notNull(),
    siretPartenaire: text().notNull(),
    versionApi: integer().notNull(),
    bilan: json().notNull()
  },
  (table) => [check('siret_check', sql`${table.siretPartenaire} ~ '^\\d{14}$'`)]
);

export const bilans = pgTable('bilans', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ...timestamps,
  siret: varchar({ length: 14 }).notNull().default('111'),
  nom: text().notNull(),
  debutExercice: date().notNull(),
  finExercice: date().notNull(),
  version: integer().notNull(),
  dateBilan: date().notNull()
});

export const dirigeants = pgTable('dirigeants', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nom: text().notNull(),
  prenom: text().notNull(),
  anneeNaissance: smallint().notNull(),
  anneeEntree: smallint().notNull(),
  idBilan: integer()
    .notNull()
    .references(() => bilans.id, { onDelete: 'cascade' })
});

export const bilansInsertSchema = createInsertSchema(bilans);
export const dirigeantsInsertSchema = createInsertSchema(dirigeants);
