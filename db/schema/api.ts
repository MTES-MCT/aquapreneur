import { type InferSelectModel, sql } from 'drizzle-orm';
import {
  boolean,
  check,
  date,
  doublePrecision,
  integer,
  json,
  numeric,
  pgTable,
  smallint,
  text
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { timestampCreation, timestamps } from '.';

const money = (name: string) => numeric(name, { precision: 15, scale: 2 });
const qty = (name: string) => doublePrecision(name);

// Authentification pour l’API
export const jetonsApi = pgTable(
  'jetons_api',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    ...timestampCreation,

    hachage: text().notNull().unique(),
    valide: boolean().notNull().default(true),
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

export const evtsJournalReqs = pgTable('journal_requetes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  idJeton: integer()
    .notNull()
    .references(() => jetonsApi.id, { onDelete: 'restrict' }),
  ...timestampCreation,

  versionApi: integer().notNull(),
  pathname: text().notNull(),
  href: text().notNull(),
  methode: text().notNull(),
  data: json().notNull(),
  status: integer()
});

export type EvtJournalReqs = InferSelectModel<typeof evtsJournalReqs>;

export const bilans = pgTable(
  'bilans',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    idEvtJournalReqs: integer()
      .notNull()
      .references(() => evtsJournalReqs.id, { onDelete: 'restrict' }),
    ...timestamps,

    siret: text().notNull(),
    nom: text().notNull(),
    debutExercice: date().notNull(),
    finExercice: date().notNull(),
    version: integer().notNull(),
    dateBilan: date().notNull(),

    // #region Stock
    stock__huitre__nais_mil__qt: qty('stock__huitre__nais_mil__qt'),
    stock__huitre__nais_mil__val: money('stock__huitre__nais_mil__val'),
    stock__huitre__nais_kg__qt: qty('stock__huitre__nais_kg__qt'),
    stock__huitre__nais_kg__val: money('stock__huitre__nais_kg__val'),
    stock__huitre__demi_elv__qt: qty('stock__huitre__demi_elv__qt'),
    stock__huitre__demi_elv__val: money('stock__huitre__demi_elv__val'),
    stock__huitre__elv__qt: qty('stock__huitre__elv__qt'),
    stock__huitre__elv__val: money('stock__huitre__elv__val'),
    stock__huitre__conso__qt: qty('stock__huitre__conso__qt'),
    stock__huitre__conso__val: money('stock__huitre__conso__val'),
    stock__moule__nais__qt: qty('stock__moule__nais__qt'),
    stock__moule__nais__val: money('stock__moule__nais__val'),
    stock__moule__demi_elv__qt: qty('stock__moule__demi_elv__qt'),
    stock__moule__demi_elv__val: money('stock__moule__demi_elv__val'),
    stock__moule__conso__qt: qty('stock__moule__conso__qt'),
    stock__moule__conso__val: money('stock__moule__conso__val'),
    stock__palourde__nais__qt: qty('stock__palourde__nais__qt'),
    stock__palourde__nais__val: money('stock__palourde__nais__val'),
    stock__palourde__demi_elv__qt: qty('stock__palourde__demi_elv__qt'),
    stock__palourde__demi_elv__val: money('stock__palourde__demi_elv__val'),
    stock__palourde__conso__qt: qty('stock__palourde__conso__qt'),
    stock__palourde__conso__val: money('stock__palourde__conso__val'),
    stock__gambas__larve__qt: qty('stock__gambas__larve__qt'),
    stock__gambas__larve__val: money('stock__gambas__larve__val'),
    stock__gambas__pregros__qt: qty('stock__gambas__pregros__qt'),
    stock__gambas__pregros__val: money('stock__gambas__pregros__val'),
    stock__gambas__conso__qt: qty('stock__gambas__conso__qt'),
    stock__gambas__conso__val: money('stock__gambas__conso__val'),
    stock__poisson__lib: text('stock__poisson__lib'),
    stock__poisson__qt: qty('stock__poisson__qt'),
    stock__poisson__val: money('stock__poisson__val'),
    stock__autre_coq__lib: text('stock__autre_coq__lib'),
    stock__autre_coq__qt: qty('stock__autre_coq__qt'),
    stock__autre_coq__val: money('stock__autre_coq__val'),
    stock__autre__lib: text('stock__autre__lib'),
    stock__autre__qt: qty('stock__autre__qt'),
    stock__autre__val: money('stock__autre__val'),
    // #endregion

    // #region Production
    prod__huitre__nais__fr__qt: qty('prod__huitre__nais__fr__qt'),
    prod__huitre__nais__fr__val: money('prod__huitre__nais__fr__val'),
    prod__huitre__nais__ue__qt: qty('prod__huitre__nais__ue__qt'),
    prod__huitre__nais__ue__val: money('prod__huitre__nais__ue__val'),
    prod__huitre__nais__nue__qt: qty('prod__huitre__nais__nue__qt'),
    prod__huitre__nais__nue__val: money('prod__huitre__nais__nue__val'),
    prod__huitre__demi_elv__fr__qt: qty('prod__huitre__demi_elv__fr__qt'),
    prod__huitre__demi_elv__fr__val: money('prod__huitre__demi_elv__fr__val'),
    prod__huitre__demi_elv__ue__qt: qty('prod__huitre__demi_elv__ue__qt'),
    prod__huitre__demi_elv__ue__val: money('prod__huitre__demi_elv__ue__val'),
    prod__huitre__demi_elv__nue__qt: qty('prod__huitre__demi_elv__nue__qt'),
    prod__huitre__demi_elv__nue__val: money('prod__huitre__demi_elv__nue__val'),
    prod__huitre__elv__fr__qt: qty('prod__huitre__elv__fr__qt'),
    prod__huitre__elv__fr__val: money('prod__huitre__elv__fr__val'),
    prod__huitre__elv__ue__qt: qty('prod__huitre__elv__ue__qt'),
    prod__huitre__elv__ue__val: money('prod__huitre__elv__ue__val'),
    prod__huitre__elv__nue__qt: qty('prod__huitre__elv__nue__qt'),
    prod__huitre__elv__nue__val: money('prod__huitre__elv__nue__val'),
    prod__huitre__conso__fr__pro__qt: qty('prod__huitre__conso__fr__pro__qt'),
    prod__huitre__conso__fr__pro__val: money('prod__huitre__conso__fr__pro__val'),
    prod__huitre__conso__fr__detail__qt: qty('prod__huitre__conso__fr__detail__qt'),
    prod__huitre__conso__fr__detail__val: money('prod__huitre__conso__fr__detail__val'),
    prod__huitre__conso__fr__grossiste__qt: qty('prod__huitre__conso__fr__grossiste__qt'),
    prod__huitre__conso__fr__grossiste__val: money('prod__huitre__conso__fr__grossiste__val'),
    prod__huitre__conso__fr__poiss__qt: qty('prod__huitre__conso__fr__poiss__qt'),
    prod__huitre__conso__fr__poiss__val: money('prod__huitre__conso__fr__poiss__val'),
    prod__huitre__conso__fr__pgms__qt: qty('prod__huitre__conso__fr__pgms__qt'),
    prod__huitre__conso__fr__pgms__val: money('prod__huitre__conso__fr__pgms__val'),
    prod__huitre__conso__fr__degust__qt: qty('prod__huitre__conso__fr__degust__qt'),
    prod__huitre__conso__fr__degust__val: money('prod__huitre__conso__fr__degust__val'),
    prod__huitre__conso__ue__pro__qt: qty('prod__huitre__conso__ue__pro__qt'),
    prod__huitre__conso__ue__pro__val: money('prod__huitre__conso__ue__pro__val'),
    prod__huitre__conso__ue__expe__qt: qty('prod__huitre__conso__ue__expe__qt'),
    prod__huitre__conso__ue__expe__val: money('prod__huitre__conso__ue__expe__val'),
    prod__huitre__conso__nue__pro__qt: qty('prod__huitre__conso__nue__pro__qt'),
    prod__huitre__conso__nue__pro__val: money('prod__huitre__conso__nue__pro__val'),
    prod__huitre__conso__nue__expe__qt: qty('prod__huitre__conso__nue__expe__qt'),
    prod__huitre__conso__nue__expe__val: money('prod__huitre__conso__nue__expe__val'),
    prod__huitre__autre__qt: qty('prod__huitre__autre__qt'),
    prod__huitre__autre__val: money('prod__huitre__autre__val'),
    prod__moule__nais__fr__qt: qty('prod__moule__nais__fr__qt'),
    prod__moule__nais__fr__val: money('prod__moule__nais__fr__val'),
    prod__moule__nais__ue__qt: qty('prod__moule__nais__ue__qt'),
    prod__moule__nais__ue__val: money('prod__moule__nais__ue__val'),
    prod__moule__nais__nue__qt: qty('prod__moule__nais__nue__qt'),
    prod__moule__nais__nue__val: money('prod__moule__nais__nue__val'),
    prod__moule__demi_elv__fr__qt: qty('prod__moule__demi_elv__fr__qt'),
    prod__moule__demi_elv__fr__val: money('prod__moule__demi_elv__fr__val'),
    prod__moule__demi_elv__ue__qt: qty('prod__moule__demi_elv__ue__qt'),
    prod__moule__demi_elv__ue__val: money('prod__moule__demi_elv__ue__val'),
    prod__moule__demi_elv__nue__qt: qty('prod__moule__demi_elv__nue__qt'),
    prod__moule__demi_elv__nue__val: money('prod__moule__demi_elv__nue__val'),
    prod__moule__conso__fr__pro__qt: qty('prod__moule__conso__fr__pro__qt'),
    prod__moule__conso__fr__pro__val: money('prod__moule__conso__fr__pro__val'),
    prod__moule__conso__fr__detail__qt: qty('prod__moule__conso__fr__detail__qt'),
    prod__moule__conso__fr__detail__val: money('prod__moule__conso__fr__detail__val'),
    prod__moule__conso__fr__grossiste__qt: qty('prod__moule__conso__fr__grossiste__qt'),
    prod__moule__conso__fr__grossiste__val: money('prod__moule__conso__fr__grossiste__val'),
    prod__moule__conso__fr__poiss__qt: qty('prod__moule__conso__fr__poiss__qt'),
    prod__moule__conso__fr__poiss__val: money('prod__moule__conso__fr__poiss__val'),
    prod__moule__conso__fr__pgms__qt: qty('prod__moule__conso__fr__pgms__qt'),
    prod__moule__conso__fr__pgms__val: money('prod__moule__conso__fr__pgms__val'),
    prod__moule__conso__fr__degust__qt: qty('prod__moule__conso__fr__degust__qt'),
    prod__moule__conso__fr__degust__val: money('prod__moule__conso__fr__degust__val'),
    prod__moule__conso__ue__pro__qt: qty('prod__moule__conso__ue__pro__qt'),
    prod__moule__conso__ue__pro__val: money('prod__moule__conso__ue__pro__val'),
    prod__moule__conso__ue__expe__qt: qty('prod__moule__conso__ue__expe__qt'),
    prod__moule__conso__ue__expe__val: money('prod__moule__conso__ue__expe__val'),
    prod__moule__conso__nue__pro__qt: qty('prod__moule__conso__nue__pro__qt'),
    prod__moule__conso__nue__pro__val: money('prod__moule__conso__nue__pro__val'),
    prod__moule__conso__nue__expe__qt: qty('prod__moule__conso__nue__expe__qt'),
    prod__moule__conso__nue__expe__val: money('prod__moule__conso__nue__expe__val'),
    prod__moule__autre__qt: qty('prod__moule__autre__qt'),
    prod__moule__autre__val: money('prod__moule__autre__val'),
    prod__palourde__nais__fr__qt: qty('prod__palourde__nais__fr__qt'),
    prod__palourde__nais__fr__val: money('prod__palourde__nais__fr__val'),
    prod__palourde__nais__ue__qt: qty('prod__palourde__nais__ue__qt'),
    prod__palourde__nais__ue__val: money('prod__palourde__nais__ue__val'),
    prod__palourde__nais__nue__qt: qty('prod__palourde__nais__nue__qt'),
    prod__palourde__nais__nue__val: money('prod__palourde__nais__nue__val'),
    prod__palourde__demi_elv__fr__qt: qty('prod__palourde__demi_elv__fr__qt'),
    prod__palourde__demi_elv__fr__val: money('prod__palourde__demi_elv__fr__val'),
    prod__palourde__demi_elv__ue__qt: qty('prod__palourde__demi_elv__ue__qt'),
    prod__palourde__demi_elv__ue__val: money('prod__palourde__demi_elv__ue__val'),
    prod__palourde__demi_elv__nue__qt: qty('prod__palourde__demi_elv__nue__qt'),
    prod__palourde__demi_elv__nue__val: money('prod__palourde__demi_elv__nue__val'),
    prod__palourde__conso__fr__pro__qt: qty('prod__palourde__conso__fr__pro__qt'),
    prod__palourde__conso__fr__pro__val: money('prod__palourde__conso__fr__pro__val'),
    prod__palourde__conso__fr__detail__qt: qty('prod__palourde__conso__fr__detail__qt'),
    prod__palourde__conso__fr__detail__val: money('prod__palourde__conso__fr__detail__val'),
    prod__palourde__conso__fr__grossiste__qt: qty('prod__palourde__conso__fr__grossiste__qt'),
    prod__palourde__conso__fr__grossiste__val: money('prod__palourde__conso__fr__grossiste__val'),
    prod__palourde__conso__fr__poiss__qt: qty('prod__palourde__conso__fr__poiss__qt'),
    prod__palourde__conso__fr__poiss__val: money('prod__palourde__conso__fr__poiss__val'),
    prod__palourde__conso__fr__pgms__qt: qty('prod__palourde__conso__fr__pgms__qt'),
    prod__palourde__conso__fr__pgms__val: money('prod__palourde__conso__fr__pgms__val'),
    prod__palourde__conso__fr__degust__qt: qty('prod__palourde__conso__fr__degust__qt'),
    prod__palourde__conso__fr__degust__val: money('prod__palourde__conso__fr__degust__val'),
    prod__palourde__conso__ue__pro__qt: qty('prod__palourde__conso__ue__pro__qt'),
    prod__palourde__conso__ue__pro__val: money('prod__palourde__conso__ue__pro__val'),
    prod__palourde__conso__ue__expe__qt: qty('prod__palourde__conso__ue__expe__qt'),
    prod__palourde__conso__ue__expe__val: money('prod__palourde__conso__ue__expe__val'),
    prod__palourde__conso__nue__pro__qt: qty('prod__palourde__conso__nue__pro__qt'),
    prod__palourde__conso__nue__pro__val: money('prod__palourde__conso__nue__pro__val'),
    prod__palourde__conso__nue__expe__qt: qty('prod__palourde__conso__nue__expe__qt'),
    prod__palourde__conso__nue__expe__val: money('prod__palourde__conso__nue__expe__val'),
    prod__palourde__autre__qt: qty('prod__palourde__autre__qt'),
    prod__palourde__autre__val: money('prod__palourde__autre__val'),
    prod__gambas__larve__fr__qt: qty('prod__gambas__larve__fr__qt'),
    prod__gambas__larve__fr__val: money('prod__gambas__larve__fr__val'),
    prod__gambas__larve__ue__qt: qty('prod__gambas__larve__ue__qt'),
    prod__gambas__larve__ue__val: money('prod__gambas__larve__ue__val'),
    prod__gambas__larve__nue__qt: qty('prod__gambas__larve__nue__qt'),
    prod__gambas__larve__nue__val: money('prod__gambas__larve__nue__val'),
    prod__gambas__pregros__fr__qt: qty('prod__gambas__pregros__fr__qt'),
    prod__gambas__pregros__fr__val: money('prod__gambas__pregros__fr__val'),
    prod__gambas__pregros__ue__qt: qty('prod__gambas__pregros__ue__qt'),
    prod__gambas__pregros__ue__val: money('prod__gambas__pregros__ue__val'),
    prod__gambas__pregros__nue__qt: qty('prod__gambas__pregros__nue__qt'),
    prod__gambas__pregros__nue__val: money('prod__gambas__pregros__nue__val'),
    prod__gambas__conso__fr__pro__qt: qty('prod__gambas__conso__fr__pro__qt'),
    prod__gambas__conso__fr__pro__val: money('prod__gambas__conso__fr__pro__val'),
    prod__gambas__conso__fr__detail__qt: qty('prod__gambas__conso__fr__detail__qt'),
    prod__gambas__conso__fr__detail__val: money('prod__gambas__conso__fr__detail__val'),
    prod__gambas__conso__fr__grossiste__qt: qty('prod__gambas__conso__fr__grossiste__qt'),
    prod__gambas__conso__fr__grossiste__val: money('prod__gambas__conso__fr__grossiste__val'),
    prod__gambas__conso__fr__poiss__qt: qty('prod__gambas__conso__fr__poiss__qt'),
    prod__gambas__conso__fr__poiss__val: money('prod__gambas__conso__fr__poiss__val'),
    prod__gambas__conso__fr__pgms__qt: qty('prod__gambas__conso__fr__pgms__qt'),
    prod__gambas__conso__fr__pgms__val: money('prod__gambas__conso__fr__pgms__val'),
    prod__gambas__conso__fr__degust__qt: qty('prod__gambas__conso__fr__degust__qt'),
    prod__gambas__conso__fr__degust__val: money('prod__gambas__conso__fr__degust__val'),
    prod__gambas__conso__ue__pro__qt: qty('prod__gambas__conso__ue__pro__qt'),
    prod__gambas__conso__ue__pro__val: money('prod__gambas__conso__ue__pro__val'),
    prod__gambas__conso__ue__expe__qt: qty('prod__gambas__conso__ue__expe__qt'),
    prod__gambas__conso__ue__expe__val: money('prod__gambas__conso__ue__expe__val'),
    prod__gambas__conso__nue__pro__qt: qty('prod__gambas__conso__nue__pro__qt'),
    prod__gambas__conso__nue__pro__val: money('prod__gambas__conso__nue__pro__val'),
    prod__gambas__conso__nue__expe__qt: qty('prod__gambas__conso__nue__expe__qt'),
    prod__gambas__conso__nue__expe__val: money('prod__gambas__conso__nue__expe__val'),
    prod__gambas__autre__qt: qty('prod__gambas__autre__qt'),
    prod__gambas__autre__val: money('prod__gambas__autre__val'),
    prod__poisson__fr__qt: qty('prod__poisson__fr__qt'),
    prod__poisson__fr__val: money('prod__poisson__fr__val'),
    prod__autre_coq__fr__qt: qty('prod__autre_coq__fr__qt'),
    prod__autre_coq__fr__val: money('prod__autre_coq__fr__val'),
    prod__autre_coq__ue__qt: qty('prod__autre_coq__ue__qt'),
    prod__autre_coq__ue__val: money('prod__autre_coq__ue__val'),
    prod__autre_coq__nue__qt: qty('prod__autre_coq__nue__qt'),
    prod__autre_coq__nue__val: money('prod__autre_coq__nue__val'),
    prod__autre__fr__qt: qty('prod__autre__fr__qt'),
    prod__autre__fr__val: money('prod__autre__fr__val'),
    prod__autre__ue__qt: qty('prod__autre__ue__qt'),
    prod__autre__ue__val: money('prod__autre__ue__val'),
    prod__autre__nue__qt: qty('prod__autre__nue__qt'),
    prod__autre__nue__val: money('prod__autre__nue__val'),
    // #endregion

    // #region Données économiques
    eco__revs__total_production_vendue: money('eco__revs__total_production_vendue'),
    eco__revs__ca_aqua_achat_revente: money('eco__revs__ca_aqua_achat_revente'),
    eco__revs__autres_revenus: money('eco__revs__autres_revenus'),
    eco__revs__subvention_exploitation: money('eco__revs__subvention_exploitation'),
    eco__revs__subvention_investissement: money('eco__revs__subvention_investissement'),
    eco__rh__traitements_salaires_personnels: money('eco__rh__traitements_salaires_personnels'),
    eco__rh__main_oeuvre_exterieure: money('eco__rh__main_oeuvre_exterieure'),
    eco__rh__charges_sociales_main_oeuvre_non_salariee: money(
      'eco__rh__charges_sociales_main_oeuvre_non_salariee'
    ),
    eco__rh__valeur_imputee_main_oeuvre_non_salariee: money(
      'eco__rh__valeur_imputee_main_oeuvre_non_salariee'
    ),
    eco__couts_energetiques: money('eco__couts_energetiques'),
    eco__achat__huitre__nais__val: money('eco__achat__huitre__nais__val'),
    eco__achat__huitre__nais__qt: qty('eco__achat__huitre__nais__qt'),
    eco__achat__huitre__demi_elv__val: money('eco__achat__huitre__demi_elv__val'),
    eco__achat__huitre__demi_elv__qt: qty('eco__achat__huitre__demi_elv__qt'),
    eco__achat__huitre__elv__val: money('eco__achat__huitre__elv__val'),
    eco__achat__huitre__elv__qt: qty('eco__achat__huitre__elv__qt'),
    eco__achat__huitre__conso__val: money('eco__achat__huitre__conso__val'),
    eco__achat__huitre__conso__qt: qty('eco__achat__huitre__conso__qt'),
    eco__achat__moule__nais__val: money('eco__achat__moule__nais__val'),
    eco__achat__moule__nais__qt: qty('eco__achat__moule__nais__qt'),
    eco__achat__moule__demi_elv__val: money('eco__achat__moule__demi_elv__val'),
    eco__achat__moule__demi_elv__qt: qty('eco__achat__moule__demi_elv__qt'),
    eco__achat__moule__conso__val: money('eco__achat__moule__conso__val'),
    eco__achat__moule__conso__qt: qty('eco__achat__moule__conso__qt'),
    eco__achat__palourde__nais__val: money('eco__achat__palourde__nais__val'),
    eco__achat__palourde__nais__qt: qty('eco__achat__palourde__nais__qt'),
    eco__achat__palourde__demi_elv__val: money('eco__achat__palourde__demi_elv__val'),
    eco__achat__palourde__demi_elv__qt: qty('eco__achat__palourde__demi_elv__qt'),
    eco__achat__palourde__conso__val: money('eco__achat__palourde__conso__val'),
    eco__achat__palourde__conso__qt: qty('eco__achat__palourde__conso__qt'),
    eco__achat__gambas__larve__val: money('eco__achat__gambas__larve__val'),
    eco__achat__gambas__larve__qt: qty('eco__achat__gambas__larve__qt'),
    eco__achat__gambas__pregros__val: money('eco__achat__gambas__pregros__val'),
    eco__achat__gambas__pregros__qt: qty('eco__achat__gambas__pregros__qt'),
    eco__achat__gambas__conso__val: money('eco__achat__gambas__conso__val'),
    eco__achat__gambas__conso__qt: qty('eco__achat__gambas__conso__qt'),
    eco__achat__autre_coq__val: money('eco__achat__autre_coq__val'),
    eco__achat__autre_coq__qt: qty('eco__achat__autre_coq__qt'),
    eco__achat__autre__val: money('eco__achat__autre__val'),
    eco__achat__autre__qt: qty('eco__achat__autre__qt'),
    eco__achat__aliments: money('eco__achat__aliments'),
    eco__autres_couts_operationnels: money('eco__autres_couts_operationnels'),
    eco__entretiens_reparations: money('eco__entretiens_reparations'),
    eco__couts_capital__amortissement_capital: money('eco__couts_capital__amortissement_capital'),
    eco__couts_capital__charges_financieres: money('eco__couts_capital__charges_financieres'),
    eco__couts_capital__produits_financiers: money('eco__couts_capital__produits_financiers'),
    eco__couts_capital__capitaux_propres: money('eco__couts_capital__capitaux_propres'),
    eco__res_except__charges_except: money('eco__res_except__charges_except'),
    eco__res_except__produits_except: money('eco__res_except__produits_except'),
    eco__valeur_totale_des_actifs: money('eco__valeur_totale_des_actifs'),
    eco__invest__total: money('eco__invest__total'),
    eco__invest__acquisition: money('eco__invest__acquisition'),
    eco__invest__cession: money('eco__invest__cession'),
    eco__passif__dettes: money('eco__passif__dettes'),
    eco__passif__emprunts_dettes_assimil: money('eco__passif__emprunts_dettes_assimil'),
    eco__ca: money('eco__ca'),
    eco__total_produits: money('eco__total_produits'),
    eco__total_charges: money('eco__total_charges'),
    eco__sig__valeur_ajoutee: money('eco__sig__valeur_ajoutee'),
    eco__sig__excedent_brut_exploitation: money('eco__sig__excedent_brut_exploitation'),
    eco__sig__resultat_courant: money('eco__sig__resultat_courant'),
    eco__sig__resultat_net: money('eco__sig__resultat_net')
    // #endregion
  },
  (table) => [check('siret_check', sql`${table.siret} ~ '^\\d{14}$'`)]
);

export const bilansInsertSchema = createInsertSchema(bilans, {
  siret: (s) => s.regex(/^\d{14}$/, 'Le SIRET doit être composé de 14 chiffres'),
  debutExercice: (schema) => schema.date(),
  finExercice: (schema) => schema.date(),
  dateBilan: (schema) => schema.date(),
  // Les champs `numeric` de drizzle sont considérées comme des chaines de caractères
  // Le code ci-dessous permet :
  // 1. d’accepter une valeur numérique dans le json (sinon Zod les rejette)
  // 2. de valider que les valeurs soient bien numériques, dans le cas de chaines.
  ...Object.fromEntries(
    Object.entries(bilans)
      .filter(([, value]) => value.columnType === 'PgNumeric')
      .map(([key]) => [
        key,
        z.preprocess(
          (val) => (val == null || val === '' ? null : String(val)),
          z
            .string()
            .refine((value) => !isNaN(Number(value)))
            .nullable()
        )
      ])
  )
});

export const dirigeantEs = pgTable('dirigeant_es', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  idBilan: integer()
    .notNull()
    .references(() => bilans.id, { onDelete: 'cascade' }),

  nom: text().notNull(),
  prenom: text().notNull(),
  anneeNaissance: smallint(),
  genre: text(),
  anneeEntree: smallint(),
  diplome: text(),
  diplomeAquacole: text(),
  regimeSocial: text(),
  tauxTravail: integer()
});

export const dirigeantEsInsertSchema = createInsertSchema(dirigeantEs);
