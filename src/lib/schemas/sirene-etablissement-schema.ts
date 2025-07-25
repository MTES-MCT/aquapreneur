// Converti à partir de sirene-etablissement-schema.json via https://transform.tools/json-schema-to-typescript
// puis modifications manuelles pour
// 1) passer au format Arktype
// 2) rendre toutes les clés nullable (l’API Sirene ne documente pas correctement les valeurs de retour)
// 3) rendre obligatoire les clés principales, qu’on s’attend à toujours récupérer (siret, etc.)
//
// https://www.sirene.fr/static-resources/documentation/v_sommaire_311.htm
// https://sirene.fr/static-resources/documentation/siret_unitaire_variables_reponse_311.html
//
import { type } from "arktype";

import { Siret } from "$lib/types";

export const SireneEtablissementResponse = type({
	"+": "ignore",
	"etablissement": {
		"siren": "string",
		"nic": "string",
		"siret": Siret,
		"activitePrincipaleRegistreMetiersEtablissement?": "string | null",
		"anneeEffectifsEtablissement?": "string | null",
		"dateCreationEtablissement?": "string | null",
		"dateDernierTraitementEtablissement?": "string | null",
		"etablissementSiege?": "boolean | null",
		"nombrePeriodesEtablissement?": "number | null",
		"statutDiffusionEtablissement?": "string | null",
		"trancheEffectifsEtablissement?": "string | null",
		"uniteLegale": {
			"activitePrincipaleUniteLegale?": "string | null",
			"anneeCategorieEntreprise?": "string | null",
			"anneeEffectifsUniteLegale?": "string | null",
			"caractereEmployeurUniteLegale?": "'O' | 'N' | null | null",
			"categorieEntreprise?": "'PME' | 'ETI' | 'GE' | null | null",
			"categorieJuridiqueUniteLegale?": "string | null",
			"codeCommuneNaissanceUniteLegale?": "string | null",
			"codePaysNaissanceUniteLegale?": "string | null",
			"dateCreationUniteLegale?": "string | null",
			"dateDernierTraitementUniteLegale?": "string | null",
			"dateNaissanceUniteLegale?": "string | null",
			"denominationUniteLegale?": "string | null",
			"denominationUsuelle1UniteLegale?": "string | null",
			"denominationUsuelle2UniteLegale?": "string | null",
			"denominationUsuelle3UniteLegale?": "string | null",
			"economieSocialeSolidaireUniteLegale?": "string | null",
			"etatAdministratifUniteLegale?": "'A' | 'C' | null",
			"identifiantAssociationUniteLegale?": "string | null",
			"libelleNationaliteUniteLegale?": "string | null",
			"nicSiegeUniteLegale?": "string | null",
			"nomenclatureActivitePrincipaleUniteLegale?":
				"'NAP' | 'NAFRev1' | 'NAFRev2' | 'NAF1993' | null",
			"nomUniteLegale?": "string | null",
			"nomUsageUniteLegale?": "string | null",
			"prenom1UniteLegale?": "string | null",
			"prenom2UniteLegale?": "string | null",
			"prenom3UniteLegale?": "string | null",
			"prenom4UniteLegale?": "string | null",
			"prenomUsuelUniteLegale?": "string | null",
			"pseudonymeUniteLegale?": "string | null",
			"sexeUniteLegale?": "'M' | 'F' | null | null",
			"sigleUniteLegale?": "string | null",
			"societeMissionUniteLegale?": "string | null",
			"statutDiffusionUniteLegale?": "string | null",
			"trancheEffectifsUniteLegale?": "string | null",
			"unitePurgeeUniteLegale?": "boolean | null",
		},
		"adresseEtablissement?": {
			"codeCedexEtablissement?": "string | null",
			"codeCommuneEtablissement?": "string | null",
			"codePaysEtrangerEtablissement?": "string | null",
			"codePostalEtablissement?": "string | null",
			"complementAdresseEtablissement?": "string | null",
			"coordonneeLambertAbscisseEtablissement?": "string | null",
			"coordonneeLambertOrdonneeEtablissement?": "string | null",
			"dernierNumeroVoieEtablissement?": "string | null",
			"distributionSpecialeEtablissement?": "string | null",
			"identifiantAdresseEtablissement?": "string | null",
			"indiceRepetitionDernierNumeroVoieEtablissement?": "string | null",
			"indiceRepetitionEtablissement?": "string | null",
			"libelleCedexEtablissement?": "string | null",
			"libelleCommuneEtablissement?": "string | null",
			"libelleCommuneEtrangerEtablissement?": "string | null",
			"libellePaysEtrangerEtablissement?": "string | null",
			"libelleVoieEtablissement?": "string | null",
			"numeroVoieEtablissement?": "string | null",
			"typeVoieEtablissement?": "string | null",
		},
		"adresse2Etablissement?": {
			"codeCedex2Etablissement?": "string | null",
			"codeCommune2Etablissement?": "string | null",
			"codePaysEtranger2Etablissement?": "string | null",
			"codePostal2Etablissement?": "string | null",
			"complementAdresse2Etablissement?": "string | null",
			"distributionSpeciale2Etablissement?": "string | null",
			"indiceRepetition2Etablissement?": "string | null",
			"libelleCedex2Etablissement?": "string | null",
			"libelleCommune2Etablissement?": "string | null",
			"libelleCommuneEtranger2Etablissement?": "string | null",
			"libellePaysEtranger2Etablissement?": "string | null",
			"libelleVoie2Etablissement?": "string | null",
			"numeroVoie2Etablissement?": "string | null",
			"typeVoie2Etablissement?": "string | null",
		},
		"periodesEtablissement?": type(
			{
				"activitePrincipaleEtablissement?": "string | null",
				"caractereEmployeurEtablissement?": "string | null",
				"changementActivitePrincipaleEtablissement?": "boolean | null",
				"changementCaractereEmployeurEtablissement?": "boolean | null",
				"changementDenominationUsuelleEtablissement?": "boolean | null",
				"changementEnseigneEtablissement?": "boolean | null",
				"changementEtatAdministratifEtablissement?": "boolean | null",
				"dateDebut?": "string | null",
				"dateFin?": "string | null",
				"denominationUsuelleEtablissement?": "string | null",
				"enseigne1Etablissement?": "string | null",
				"enseigne2Etablissement?": "string | null",
				"enseigne3Etablissement?": "string | null",
				"etatAdministratifEtablissement?": "string | null",
				"nomenclatureActivitePrincipaleEtablissement?":
					"'NAP' | 'NAFRev1' | 'NAFRev2' | 'NAF1993' | null",
			},
			"[]",
		),
	},
});

export type SireneEtablissementResponse =
	typeof SireneEtablissementResponse.infer;
