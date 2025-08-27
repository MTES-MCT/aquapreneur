import { type } from "arktype";

import { ALEAS_IDS } from "$lib/constants";
import { Email, IsoDate, Percent, PositiveNumber, Siret } from "$lib/types";

export const Zone = type("'Nord - Pas-de-Calais' | 'Baie de Somme'");

export const Repartition = type(
	{
		part: Percent,
		repartition: Zone,
	},
	"[]",
);

export const EspeceAchatSchema = type({
	"naissains?": {
		// en milliers
		quantite: PositiveNumber.or(type.null),
	},
	"juveniles?": {
		quantite: PositiveNumber.or(type.null),
	},
	"adultes?": {
		quantite: PositiveNumber.or(type.null),
	},
});

export const ValeurHT = type({
	"valeurHT?": PositiveNumber.or(type.null),
}).or(type.null);

export const Volume = type({
	"volume?": PositiveNumber.or(type.null),
}).or(type.null);

export const EspeceVenteSchema = type({
	"validation?": {
		"naissain?": "boolean",
		"elevage?": "boolean",
		"consommation?": "boolean",
		"origine?": "boolean",
	},

	"naissain?": {
		"captage?": {
			"destination?": {
				"france?": ValeurHT,
				"etranger?": ValeurHT,
			},
		},
		"ecloserieDiploide?": {
			"destination?": {
				"france?": ValeurHT,
				"etranger?": ValeurHT,
			},
		},
		"ecloserieTriploide?": {
			"destination?": {
				"france?": ValeurHT,
				"etranger?": ValeurHT,
			},
		},
	},
	"elevage?": {
		"pregrossi?": {
			"destination?": {
				"france?": ValeurHT,
				"etranger?": ValeurHT,
			},
		},
		"demiElevage?": {
			"destination?": {
				"france?": ValeurHT,
				"etranger?": ValeurHT,
			},
		},
		"adulte?": {
			"destination?": {
				"france?": ValeurHT,
				"etranger?": ValeurHT,
			},
		},
	},
	"consommation?": {
		"destination?": {
			"france?": {
				"degustation?": ValeurHT,
				"autresVentesParticuliers?": ValeurHT,
				"autresConchyliculteurs?": ValeurHT,
				"restaurateursTraiteurs?": ValeurHT,
				"poissoniersEcaillers?": ValeurHT,
				"grandesMoyennesSurfaces?": ValeurHT,
				"mareyeursGrossistes?": ValeurHT,
			},
			"unionEuropeenne?": ValeurHT,
			"horsUnionEuropeenne?": ValeurHT,
		},
		"affinage?": {
			"claires?": {
				"part?": Percent.or(type.null),
				"surfaceHa?": PositiveNumber.or(type.null),
			},
			"parcs?": {
				"part?": Percent.or(type.null),
				"surfaceHa?": PositiveNumber.or(type.null),
			},
		},
		"bio?": {
			"part?": Percent.or(type.null),
		},
		"origine?": {
			"captage?": Percent.or(type.null),
			"ecloserieDiploide?": Percent.or(type.null),
			"ecloserieTriploide?": Percent.or(type.null),
		},
	},
});

export const ProdValues = type({
	"valeurHT?": PositiveNumber.or(type.null),
	"volume?": PositiveNumber.or(type.null),
	"valeurHTMi?": PositiveNumber.or(type.null).describe("en milliers"),
	"volumeMi?": PositiveNumber.or(type.null).describe("en milliers"),
}).or(type.null);

export const EspeceProdSchema = type({
	"naissain?": ProdValues,
	"elevage?": {
		"demiElevage?": ProdValues,
		"adulte?": ProdValues,
	},
	"consommation?": ProdValues,
});

export const DeclarationSchema = type({
	etapes: {
		entrepriseValidee: "boolean",
		concessionValidee: "boolean",
		stockValidee: "boolean",
		productionValidee: "boolean",
		envoiValidee: "boolean",
		declarationValidee: "boolean",
	},
	retourAnnee: {
		aleas: type.enumerated(...ALEAS_IDS).array(),
		aleasDetails: "string | null = null",
		difficultes: "string | null = null",
		suggestions: "string | null = null",
		raisonsInactivite: "string | null = null",
	},
	aProduit: "boolean | null = null",
	dateBilan: IsoDate.or(type.null),
	debutExercice: IsoDate.or(type.null),
	finExercice: IsoDate.or(type.null),
	entreprise: {
		emailEntreprise: Email.or(type.null).default(null),
		telEntreprise: "string | null = null",
		emailContact: Email.or(type.null).default(null),
		telContact: "string | null = null",
	},
	etablissement: {
		siret: Siret,
		denomination: "string",
		codeActivitePrincipale: "string | null",
		activitePrincipale: "string | null",
		adresse: "string | null",
		codePostal: "string | null",
		commune: "string | null",
	},
	achats: {
		"huitrePlate?": EspeceAchatSchema,
		"huitreCreuse?": EspeceAchatSchema,
		"mouleCommune?": EspeceAchatSchema,
		"mouleMediterraneenne?": EspeceAchatSchema,
		"palourde?": EspeceAchatSchema,
		"coque?": EspeceAchatSchema,
	},
	ventes: {
		"huitrePlate?": EspeceVenteSchema,
		"huitreCreuse?": EspeceVenteSchema,
		"mouleCommune?": EspeceVenteSchema,
		"mouleMediterraneenne?": EspeceVenteSchema,
		"palourde?": EspeceVenteSchema,
		"coque?": EspeceVenteSchema,
	},
	production: {
		"huitrePlate?": EspeceProdSchema,
		"huitreCreuse?": EspeceProdSchema,
		"mouleCommune?": EspeceProdSchema,
		"mouleMediterraneenne?": EspeceProdSchema,
		"palourde?": EspeceProdSchema,
		"coque?": EspeceProdSchema,
	},
	concessions: type(
		{
			quartierParcelle: "string | null",
			libLocalite: "string | null",
			nomLieuDit: "string | null",
			numeroParcelle: "string | null",
			codeLocaliteInsee: "string | null",
			nomSituation: "string | null",
			typeParcelle: "string | null",
			surfaceParcelle: "number | null",
			uniteMesure: "string | null",
			etatParcelle: "string | null",
			familleExploitation: "string | null",
			exploitation: "string | null",
			familleEspece: "string | null",
			espece: "string | null",
			natureJuridique: "string | null",
			numArrete: "string | null",
			dateArrete: "string | null",
		},
		"[]",
	),
});

export type DeclarationSchema = typeof DeclarationSchema.infer;
