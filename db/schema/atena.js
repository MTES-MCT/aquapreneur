////////////////////////////////////////////////////////////////////////////////
// Données de concessions ATENA de la DGAMPA
//
// Schéma initialement généré via drizzle-kit pull, après l’import initial ATENA
// fait via data-tools/R/import-atena.R
//
//
import {
  doublePrecision,
  geometry,
  index,
  pgSchema,
  serial,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';

export const atena = pgSchema('atena');

export const concessions = atena.table(
  'concessions',
  {
    id: serial().primaryKey().notNull(),
    nom: varchar(),
    siren: varchar(),
    sirenNic: varchar('siren_nic'),
    estDetenteurPrincipal: doublePrecision('est_detenteur_principal'),
    idRcmParcelle: doublePrecision('id_rcm_parcelle'),
    numeroParcelle: varchar('numero_parcelle'),
    numVersion: doublePrecision('num_version'),
    typeParcelle: varchar('type_parcelle'),
    codeEtatParcelle: varchar('code_etat_parcelle'),
    etatParcelle: varchar('etat_parcelle'),
    codeNatureJuridique: varchar('code_nature_juridique'),
    natureJuridique: varchar('nature_juridique'),
    codeNatureTerrain: varchar('code_nature_terrain'),
    natureTerrain: varchar('nature_terrain'),
    codeOuvrage: varchar('code_ouvrage'),
    ouvrage: varchar(),
    codeLieuDit: varchar('code_lieu_dit'),
    nomLieuDit: varchar('nom_lieu_dit'),
    quartierLieuDit: varchar('quartier_lieu_dit'),
    numeroTiersExploitant: varchar('numero_tiers_exploitant'),
    nomTiersExploitant: varchar('nom_tiers_exploitant'),
    numeroSteExploitante: varchar('numero_ste_exploitante'),
    nomSteExploitante: varchar('nom_ste_exploitante'),
    codeLocaliteInsee: varchar('code_localite_insee'),
    libLocalite: varchar('lib_localite'),
    codeQuartierParcelle: varchar('code_quartier_parcelle'),
    quartierParcelle: varchar('quartier_parcelle'),
    codeZoosanitaire: varchar('code_zoosanitaire'),
    zoosanitaire: varchar(),
    codeSituation: varchar('code_situation'),
    nomSituation: varchar('nom_situation'),
    numArrete: varchar('num_arrete'),
    dateArrete: timestamp('date_arrete', { withTimezone: true, mode: 'string' }),
    dateCreation: timestamp('date_creation', { withTimezone: true, mode: 'string' }),
    dateEnvoiCourrier: timestamp('date_envoi_courrier', { withTimezone: true, mode: 'string' }),
    dateSignatureCdc: timestamp('date_signature_cdc', { withTimezone: true, mode: 'string' }),
    dateValidite: timestamp('date_validite', { withTimezone: true, mode: 'string' }),
    codeAutoriteDeliv: varchar('code_autorite_deliv'),
    autoriteDeliv: varchar('autorite_deliv'),
    codeAvisArrete: varchar('code_avis_arrete'),
    avisArrete: varchar('avis_arrete'),
    codeServiceArrete: varchar('code_service_arrete'),
    serviceArrete: varchar('service_arrete'),
    codeStatutArrete: varchar('code_statut_arrete'),
    statutArrete: varchar('statut_arrete'),
    codeUniteMesure: varchar('code_unite_mesure'),
    uniteMesure: varchar('unite_mesure'),
    codeTypeOccupation: varchar('code_type_occupation'),
    typeOccupation: varchar('type_occupation'),
    codeService: varchar('code_service'),
    service: varchar(),
    surfaceParcelle: doublePrecision('surface_parcelle'),
    longueurParcelle: doublePrecision('longueur_parcelle'),
    surfaceOccupation: doublePrecision('surface_occupation'),
    redevanceEstimee: doublePrecision('redevance_estimee'),
    dateDispoSte: varchar('date_dispo_ste'),
    numZoosanitaire: varchar('num_zoosanitaire'),
    numAgrSanitaire: varchar('num_agr_sanitaire'),
    nombrePoints: doublePrecision('nombre_points'),
    bassin: varchar(),
    coefMesurage: varchar('coef_mesurage'),
    observations: varchar(),
    coordX: varchar('coord_x'),
    coordY: varchar('coord_y'),
    coordZ: varchar('coord_z'),
    dateAmortissement: timestamp('date_amortissement', { withTimezone: true, mode: 'string' }),
    dureeTemporaire: varchar('duree_temporaire'),
    mntIndemnites: doublePrecision('mnt_indemnites'),
    commIndemnites: varchar('comm_indemnites'),
    numCadastre: varchar('num_cadastre'),
    sectionCadastrale: varchar('section_cadastrale'),
    dateAnciennete: varchar('date_anciennete'),
    dureeArreteJour: doublePrecision('duree_arrete_jour'),
    dureeArreteMois: doublePrecision('duree_arrete_mois'),
    dureeArreteAnnee: doublePrecision('duree_arrete_annee'),
    dateExpiration: timestamp('date_expiration', { withTimezone: true, mode: 'string' }),
    dateFinSuspension: varchar('date_fin_suspension'),
    miseADisposition: doublePrecision('mise_a_disposition'),
    dateDecision: timestamp('date_decision', { withTimezone: true, mode: 'string' }),
    dureeValidite: varchar('duree_validite'),
    codeEspece: varchar('code_espece'),
    espece: varchar(),
    estEspecePrincipale: doublePrecision('est_espece_principale'),
    familleEspece: varchar('famille_espece'),
    codeExploitation: doublePrecision('code_exploitation'),
    exploitation: varchar(),
    familleExploitation: varchar('famille_exploitation'),
    geom: geometry({ type: 'multipolygon', srid: 4326 })
  },
  (table) => [
    index('concessions_geom_geom_idx').using(
      'gist',
      table.geom.asc().nullsLast().op('gist_geometry_ops_2d')
    )
  ]
);
