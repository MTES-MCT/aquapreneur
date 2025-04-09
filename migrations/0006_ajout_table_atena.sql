CREATE TABLE "atena" (
	"id" serial PRIMARY KEY NOT NULL,
	"nom" varchar,
	"siren" varchar,
	"siren_nic" varchar,
	"est_detenteur_principal" double precision,
	"id_rcm_parcelle" double precision,
	"numero_parcelle" varchar,
	"num_version" double precision,
	"type_parcelle" varchar,
	"code_etat_parcelle" varchar,
	"etat_parcelle" varchar,
	"code_nature_juridique" varchar,
	"nature_juridique" varchar,
	"code_nature_terrain" varchar,
	"nature_terrain" varchar,
	"code_ouvrage" varchar,
	"ouvrage" varchar,
	"code_lieu_dit" varchar,
	"nom_lieu_dit" varchar,
	"quartier_lieu_dit" varchar,
	"numero_tiers_exploitant" varchar,
	"nom_tiers_exploitant" varchar,
	"numero_ste_exploitante" varchar,
	"nom_ste_exploitante" varchar,
	"code_localite_insee" varchar,
	"lib_localite" varchar,
	"code_quartier_parcelle" varchar,
	"quartier_parcelle" varchar,
	"code_zoosanitaire" varchar,
	"zoosanitaire" varchar,
	"code_situation" varchar,
	"nom_situation" varchar,
	"num_arrete" varchar,
	"date_arrete" timestamp with time zone,
	"date_creation" timestamp with time zone,
	"date_envoi_courrier" timestamp with time zone,
	"date_signature_cdc" timestamp with time zone,
	"date_validite" timestamp with time zone,
	"code_autorite_deliv" varchar,
	"autorite_deliv" varchar,
	"code_avis_arrete" varchar,
	"avis_arrete" varchar,
	"code_service_arrete" varchar,
	"service_arrete" varchar,
	"code_statut_arrete" varchar,
	"statut_arrete" varchar,
	"code_unite_mesure" varchar,
	"unite_mesure" varchar,
	"code_type_occupation" varchar,
	"type_occupation" varchar,
	"code_service" varchar,
	"service" varchar,
	"surface_parcelle" double precision,
	"longueur_parcelle" double precision,
	"surface_occupation" double precision,
	"redevance_estimee" double precision,
	"date_dispo_ste" varchar,
	"num_zoosanitaire" varchar,
	"num_agr_sanitaire" varchar,
	"nombre_points" double precision,
	"bassin" varchar,
	"coef_mesurage" varchar,
	"observations" varchar,
	"coord_x" varchar,
	"coord_y" varchar,
	"coord_z" varchar,
	"date_amortissement" timestamp with time zone,
	"duree_temporaire" varchar,
	"mnt_indemnites" double precision,
	"comm_indemnites" varchar,
	"num_cadastre" varchar,
	"section_cadastrale" varchar,
	"date_anciennete" varchar,
	"duree_arrete_jour" double precision,
	"duree_arrete_mois" double precision,
	"duree_arrete_annee" double precision,
	"date_expiration" timestamp with time zone,
	"date_fin_suspension" varchar,
	"mise_a_disposition" double precision,
	"date_decision" timestamp with time zone,
	"duree_validite" varchar,
	"code_espece" varchar,
	"espece" varchar,
	"est_espece_principale" double precision,
	"famille_espece" varchar,
	"code_exploitation" double precision,
	"exploitation" varchar,
	"famille_exploitation" varchar,
	"geom" geometry(point)
);

CREATE INDEX "atena_geom_idx" ON "atena" USING gist ("geom" gist_geometry_ops_2d);