CREATE TYPE "public"."declaration_type" AS ENUM('api', 'comptable', 'producteur');
ALTER TABLE "declarations" ADD COLUMN "type" "declaration_type" NOT NULL;
ALTER TABLE "declarations" ADD CONSTRAINT "declarations_siret_annee_type_unique" UNIQUE("siret","annee","type");