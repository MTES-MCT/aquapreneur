CREATE TABLE "entreprises" (
	"siren" text PRIMARY KEY NOT NULL,
	"code_activite_principale" text,
	"activite_principale" text,
	"denomination" text,
	"date_creation" timestamp with time zone DEFAULT now() NOT NULL,
	"date_maj" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "siren_check" CHECK ("entreprises"."siren" ~ '^\d{9}$')
);

CREATE TABLE "etablissements" (
	"siret" text PRIMARY KEY NOT NULL,
	"siren" text NOT NULL,
	"denomination" text,
	"siege" boolean,
	"code_activite_principale" text,
	"activite_principale" text,
	"adresse" text,
	"id_adresse" text,
	"code_postal" text,
	"code_commune" text,
	"commune" text,
	"date_creation" timestamp with time zone DEFAULT now() NOT NULL,
	"date_maj" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "siret_check" CHECK ("etablissements"."siret" ~ '^\d{14}$'),
	CONSTRAINT "siren_check" CHECK ("etablissements"."siren" ~ '^\d{9}$')
);

ALTER TABLE "etablissements" ADD CONSTRAINT "etablissements_siren_entreprises_siren_fk" FOREIGN KEY ("siren") REFERENCES "public"."entreprises"("siren") ON DELETE restrict ON UPDATE no action;