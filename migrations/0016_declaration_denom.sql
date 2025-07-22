ALTER TABLE "entreprises" ALTER COLUMN "denomination" SET NOT NULL;
ALTER TABLE "etablissements" ALTER COLUMN "denomination" SET NOT NULL;
ALTER TABLE "declarations" ADD COLUMN "denomination" text NOT NULL;