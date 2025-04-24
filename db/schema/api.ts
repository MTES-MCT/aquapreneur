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

const money = () => numeric({ precision: 15, scale: 2 });
const qty = () => doublePrecision();

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
    StckVolHNaisMi: qty(),
    StckValHNaisMi: money(),
    StckVolHNaisKg: qty(),
    StckValHNaisKg: money(),
    StckVolHDElv: qty(),
    StckValHDElv: money(),
    StckVolHElv: qty(),
    StckValHElv: money(),
    StckVolHConso: qty(),
    StckValHConso: money(),
    StckVolMNaiss: qty(),
    StckValMNaiss: money(),
    StckVolMDElv: qty(),
    StckValMDElv: money(),
    StckVolMConso: qty(),
    StckValMConso: money(),
    StckVolPNaiss: qty(),
    StckValPNaiss: money(),
    StckVolPDElv: qty(),
    StckValPDElv: money(),
    StckVolPConso: qty(),
    StckValPConso: money(),
    StckVolGLarv: qty(),
    StckValGLarv: money(),
    StckVolGPreg: qty(),
    StckValGPreg: money(),
    StckVolGConso: qty(),
    StckValGConso: money(),
    LibPois: text(),
    StckVolPois: qty(),
    StckValPois: money(),
    LibACoq: text(),
    StckVolACoq: qty(),
    StckValACoq: money(),
    LibAPAqua: text(),
    StckVolAPAqua: qty(),
    StckValAPAqua: money(),
    // #endregion

    // #region Production
    VolVtHNaissFr: qty(),
    CAHNaissFr: money(),
    VolVtHNaissUE: qty(),
    CAHNaissUE: money(),
    VolVtHNaissAu: qty(),
    CAHNaissAu: money(),
    VolVtHDElvFr: qty(),
    CAHDElvFr: money(),
    VolVtHDElvUE: qty(),
    CAHDElvUE: money(),
    VolVtHDElvAu: qty(),
    CAHDElvAU: money(),
    VolVtHElvFr: qty(),
    CAHElvFr: money(),
    VolVtHElvUE: qty(),
    CAHElvUE: money(),
    VolVtHElvAu: qty(),
    CAHElvAu: money(),
    VolVtHCoFrPro: qty(),
    CAHCoFrPro: money(),
    VolVtHCoFrDet: qty(),
    CAHCoFrDet: money(),
    VolVtHCoFrGros: qty(),
    CAHCoFrGros: money(),
    VolVtHCoFrPCE: qty(),
    CAHCoFrPCE: money(),
    VolVtHCoFrPGMS: qty(),
    CAHCoFrPGMS: money(),
    VolVtHCoFrDeg: qty(),
    CAHCoFrDeg: money(),
    VolVtHCoUEPro: qty(),
    CAHCoUEPro: money(),
    VolVtHCoUEGros: qty(),
    CAHCoUEGros: money(),
    VolVtHCoAuPro: qty(),
    CAHCoAuPro: money(),
    VolVtHCoAuGros: qty(),
    CAHCoAuGros: money(),
    VolVtHFrNCat: qty(),
    CAHFrNCat: money(),
    VolVtMNaissFr: qty(),
    CAMNaissFr: money(),
    VolVtMNaissUE: qty(),
    CAMNaissUE: money(),
    VolVtMNaissAu: qty(),
    CAMNaissAu: money(),
    VolVtMDElvFr: qty(),
    CAMDElvFr: money(),
    VolVtMDElvUE: qty(),
    CAMDElvUE: money(),
    VolVtMDElvAu: qty(),
    CAMDElvAU: money(),
    VolVtMCoFrPro: qty(),
    CAMCoFrPro: money(),
    VolVtMCoFrDet: qty(),
    CAMCoFrDet: money(),
    VolVtMCoFrGros: qty(),
    CAMCoFrGros: money(),
    VolVtMCoFrPCE: qty(),
    CAMCoFrPCE: money(),
    VolVtMCoFrPGMS: qty(),
    CAMCoFrPGMS: money(),
    VolVtMCoFrDeg: qty(),
    CAMCoFrDeg: money(),
    VolVtMCoUEPro: qty(),
    CAMCoUEPro: money(),
    VolVtMCoUEGros: qty(),
    CAMCoUEGros: money(),
    VolVtMCoAuPro: qty(),
    CAMCoAuPro: money(),
    VolVtMCoAuGros: qty(),
    CAMCoAuGros: money(),
    VolVtMFrNCat: qty(),
    CAMFrNCat: money(),
    VolVtPNaissFr: qty(),
    CAPNaissFr: money(),
    VolVtPNaissUE: qty(),
    CAPNaissUE: money(),
    VolVtPNaissAu: qty(),
    CAPNaissAu: money(),
    VolVtPDElvFr: qty(),
    CAPDElvFr: money(),
    VolVtPDElvUE: qty(),
    CAPDElvUE: money(),
    VolVtPDElvAu: qty(),
    CAPDElvAU: money(),
    VolVtPCoFrPro: qty(),
    CAPCoFrPro: money(),
    VolVtPCoFrDet: qty(),
    CAPCoFrDet: money(),
    VolVtPCoFrGros: qty(),
    CAPCoFrGros: money(),
    VolVtPCoFrPCE: qty(),
    CAPCoFrPCE: money(),
    VolVtPCoFrPGMS: qty(),
    CAPCoFrPGMS: money(),
    VolVtPCoFrDeg: qty(),
    CAPCoFrDeg: money(),
    VolVtPCoUEPro: qty(),
    CAPCoUEPro: money(),
    VolVtPCoUEGros: qty(),
    CAPCoUEGros: money(),
    VolVtPCoAuPro: qty(),
    CAPCoAuPro: money(),
    VolVtPCoAuGros: qty(),
    CAPCoAuGros: money(),
    VolVtPFrNCat: qty(),
    CAPFrNCat: money(),
    VolVtGNaissFr: qty(),
    CAGNaissFr: money(),
    VolVtGNaissUE: qty(),
    CAGNaissUE: money(),
    VolVtGNaissAu: qty(),
    CAGNaissAu: money(),
    VolVtGDElvFr: qty(),
    CAGDElvFr: money(),
    VolVtGDElvUE: qty(),
    CAGDElvUE: money(),
    VolVtGDElvAu: qty(),
    CAGDElvAU: money(),
    VolVtGCoFrPro: qty(),
    CAGCoFrPro: money(),
    VolVtGCoFrDet: qty(),
    CAGCoFrDet: money(),
    VolVtGCoFrGros: qty(),
    CAGCoFrGros: money(),
    VolVtGCoFrPCE: qty(),
    CAGCoFrPCE: money(),
    VolVtGCoFrPGMS: qty(),
    CAGCoFrPGMS: money(),
    VolVtGCoFrDeg: qty(),
    CAGCoFrDeg: money(),
    VolVtGCoUEPro: qty(),
    CAGCoUEPro: money(),
    VolVtGCoUEGros: qty(),
    CAGCoUEGros: money(),
    VolVtGCoAuPro: qty(),
    CAGCoAuPro: money(),
    VolVtGCoAuGros: qty(),
    CAGCoAuGros: money(),
    VolVtGFrNCat: qty(),
    CAGFrNCat: money(),
    VolVtPoisFr: qty(),
    CAPoisFr: money(),
    VolVtACoqFr: qty(),
    CAACoqFr: money(),
    VolVtACoqUE: qty(),
    CAACoqUE: money(),
    VolVtACoqAu: qty(),
    CAACoqAu: money(),
    VolVtAPAquaFr: qty(),
    CAAPAquaFr: money(),
    VolVtAPAquaUE: qty(),
    CAAPAquaUE: money(),
    VolVtAPAquaAu: qty(),
    CAAPAquaAu: money(),
    // #endregion

    // #region Données économiques
    CATot: money(),
    CAAchRev: money(),
    ArevD: money(),
    Subv: money(),
    SubInvest: money(),
    Salaire: money(),
    MOExt: money(),
    CHSocNonSal: money(),
    NonSal: money(),
    Energie: money(),
    AchHNaiss: money(),
    VolAchHNaiss: qty(),
    AchHDElv: money(),
    VolAchHDElv: qty(),
    AchHElv: money(),
    VolAchHElv: qty(),
    AchHConso: money(),
    VolAchHConso: qty(),
    AchMNaiss: money(),
    VolAchMnaiss: qty(),
    AchMDElv: money(),
    VolAchMDElv: qty(),
    AchMConso: money(),
    VolAchMConso: qty(),
    AchPNaiss: money(),
    VolAchPnaiss: qty(),
    AchPDElv: money(),
    VolAchPDElv: qty(),
    AchPConso: money(),
    VolAchPConso: qty(),
    AchGNaiss: money(),
    VolAchGnaiss: qty(),
    AchGDElv: money(),
    VolAchGDElv: qty(),
    AchGConso: money(),
    VolAchGConso: qty(),
    AchAcoq: money(),
    VolAchAcoq: qty(),
    AchAPAqua: money(),
    VolAchAPAqua: qty(),
    CtAlim: money(),
    CtOp: money(),
    Repar: money(),
    Amort: money(),
    CtFi: money(),
    ProdFi: money(),
    Capito: money(),
    CtExcp: money(),
    ProdExcp: money(),
    Actif: money(),
    Invest: money(),
    Acqui_Immo: money(),
    Cess_Immo: money(),
    Dettes: money(),
    Emprunts: money(),
    CACompt: money(),
    TotProd: money(),
    TotCharge: money(),
    VA: money(),
    EBE: money(),
    ResultatCourant: money(),
    ResultatNet: money()
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
