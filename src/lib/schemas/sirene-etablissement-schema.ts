// Converti à partir de sirene-etablissement-schema.json via https://transform.tools/json-schema-to-typescript
// puis modifications manuelles pour
// 1) passer au format Zod
// 2) rendre toutes les clés nullable (l’API Sirene ne documente pas correctement les valeurs de retour)
// 3) rendre obligatoire les clés principales, qu’on s’attend à toujours récupérer (siret, etc.)
//
// https://www.sirene.fr/static-resources/documentation/v_sommaire_311.htm
// https://sirene.fr/static-resources/documentation/siret_unitaire_variables_reponse_311.html
import { z } from "zod";

import { Siret, optObject } from "$lib/types";

export const SireneEtablissementResponse = z.looseObject({
	etablissement: z.object({
		siren: z.string(),
		nic: z.string(),
		siret: Siret,
		activitePrincipaleRegistreMetiersEtablissement: z.string().nullish(),
		anneeEffectifsEtablissement: z.string().nullish(),
		dateCreationEtablissement: z.string().nullish(),
		dateDernierTraitementEtablissement: z.string().nullish(),
		etablissementSiege: z.boolean().nullish(),
		nombrePeriodesEtablissement: z.number().nullish(),
		statutDiffusionEtablissement: z.string().nullish(),
		trancheEffectifsEtablissement: z.string().nullish(),
		uniteLegale: z.object({
			activitePrincipaleUniteLegale: z.string().nullish(),
			anneeCategorieEntreprise: z.string().nullish(),
			anneeEffectifsUniteLegale: z.string().nullish(),
			caractereEmployeurUniteLegale: z.literal(["O", "N"]).nullish(),
			categorieEntreprise: z.literal(["PME", "ETI", "GE"]).nullish(),
			categorieJuridiqueUniteLegale: z.string().nullish(),
			codeCommuneNaissanceUniteLegale: z.string().nullish(),
			codePaysNaissanceUniteLegale: z.string().nullish(),
			dateCreationUniteLegale: z.string().nullish(),
			dateDernierTraitementUniteLegale: z.string().nullish(),
			dateNaissanceUniteLegale: z.string().nullish(),
			denominationUniteLegale: z.string().nullish(),
			denominationUsuelle1UniteLegale: z.string().nullish(),
			denominationUsuelle2UniteLegale: z.string().nullish(),
			denominationUsuelle3UniteLegale: z.string().nullish(),
			economieSocialeSolidaireUniteLegale: z.string().nullish(),
			etatAdministratifUniteLegale: z.literal(["A", "C"]).nullish(),
			identifiantAssociationUniteLegale: z.string().nullish(),
			libelleNationaliteUniteLegale: z.string().nullish(),
			nicSiegeUniteLegale: z.string().nullish(),
			nomenclatureActivitePrincipaleUniteLegale: z
				.literal(["NAP", "NAFRev1", "NAFRev2", "NAF1993"])
				.nullish(),
			nomUniteLegale: z.string().nullish(),
			nomUsageUniteLegale: z.string().nullish(),
			prenom1UniteLegale: z.string().nullish(),
			prenom2UniteLegale: z.string().nullish(),
			prenom3UniteLegale: z.string().nullish(),
			prenom4UniteLegale: z.string().nullish(),
			prenomUsuelUniteLegale: z.string().nullish(),
			pseudonymeUniteLegale: z.string().nullish(),
			sexeUniteLegale: z.literal(["M", "F"]).nullish(),
			sigleUniteLegale: z.string().nullish(),
			societeMissionUniteLegale: z.string().nullish(),
			statutDiffusionUniteLegale: z.string().nullish(),
			trancheEffectifsUniteLegale: z.string().nullish(),
			unitePurgeeUniteLegale: z.boolean().nullish(),
		}),
		adresseEtablissement: optObject({
			codeCedexEtablissement: z.string().nullish(),
			codeCommuneEtablissement: z.string().nullish(),
			codePaysEtrangerEtablissement: z.string().nullish(),
			codePostalEtablissement: z.string().nullish(),
			complementAdresseEtablissement: z.string().nullish(),
			coordonneeLambertAbscisseEtablissement: z.string().nullish(),
			coordonneeLambertOrdonneeEtablissement: z.string().nullish(),
			dernierNumeroVoieEtablissement: z.string().nullish(),
			distributionSpecialeEtablissement: z.string().nullish(),
			identifiantAdresseEtablissement: z.string().nullish(),
			indiceRepetitionDernierNumeroVoieEtablissement: z.string().nullish(),
			indiceRepetitionEtablissement: z.string().nullish(),
			libelleCedexEtablissement: z.string().nullish(),
			libelleCommuneEtablissement: z.string().nullish(),
			libelleCommuneEtrangerEtablissement: z.string().nullish(),
			libellePaysEtrangerEtablissement: z.string().nullish(),
			libelleVoieEtablissement: z.string().nullish(),
			numeroVoieEtablissement: z.string().nullish(),
			typeVoieEtablissement: z.string().nullish(),
		}),
		adresse2Etablissement: optObject({
			codeCedex2Etablissement: z.string().nullish(),
			codeCommune2Etablissement: z.string().nullish(),
			codePaysEtranger2Etablissement: z.string().nullish(),
			codePostal2Etablissement: z.string().nullish(),
			complementAdresse2Etablissement: z.string().nullish(),
			distributionSpeciale2Etablissement: z.string().nullish(),
			indiceRepetition2Etablissement: z.string().nullish(),
			libelleCedex2Etablissement: z.string().nullish(),
			libelleCommune2Etablissement: z.string().nullish(),
			libelleCommuneEtranger2Etablissement: z.string().nullish(),
			libellePaysEtranger2Etablissement: z.string().nullish(),
			libelleVoie2Etablissement: z.string().nullish(),
			numeroVoie2Etablissement: z.string().nullish(),
			typeVoie2Etablissement: z.string().nullish(),
		}),
		periodesEtablissement: z
			.object({
				activitePrincipaleEtablissement: z.string().nullish(),
				caractereEmployeurEtablissement: z.string().nullish(),
				changementActivitePrincipaleEtablissement: z.boolean().nullish(),
				changementCaractereEmployeurEtablissement: z.boolean().nullish(),
				changementDenominationUsuelleEtablissement: z.boolean().nullish(),
				changementEnseigneEtablissement: z.boolean().nullish(),
				changementEtatAdministratifEtablissement: z.boolean().nullish(),
				dateDebut: z.string().nullish(),
				dateFin: z.string().nullish(),
				denominationUsuelleEtablissement: z.string().nullish(),
				enseigne1Etablissement: z.string().nullish(),
				enseigne2Etablissement: z.string().nullish(),
				enseigne3Etablissement: z.string().nullish(),
				etatAdministratifEtablissement: z.string().nullish(),
				nomenclatureActivitePrincipaleEtablissement: z
					.literal(["NAP", "NAFRev1", "NAFRev2", "NAF1993"])
					.nullish(),
			})
			.array()
			.optional(),
	}),
});

export type SireneEtablissementResponse = z.infer<
	typeof SireneEtablissementResponse
>;
