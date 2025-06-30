CREATE TABLE "declarations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "declarations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"siret" text,
	"annee" integer NOT NULL,
	"donnees" jsonb NOT NULL,
	"date_creation" timestamp with time zone DEFAULT now() NOT NULL,
	"date_maj" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "siret_check" CHECK ("declarations"."siret" ~ '^\d{14}$')
);

ALTER TABLE "declarations" ADD CONSTRAINT "declarations_siret_etablissements_siret_fk" FOREIGN KEY ("siret") REFERENCES "public"."etablissements"("siret") ON DELETE no action ON UPDATE no action;