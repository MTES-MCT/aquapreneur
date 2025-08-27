import { type } from "arktype";

import { ALEAS_IDS, QUARTIERS_IMMATRICULATION_IDS } from "$lib/constants";
import { Email, IsoDate, Percent, PositiveNumber, Siret } from "$lib/types";

export const ValeurVente = type({
	"valeurHT?": PositiveNumber.or(type.null),
	"quantiteKg?": PositiveNumber.or(type.null),
}).or(type.null);

export const Volume = type({
	"volume?": PositiveNumber.or(type.null),
}).or(type.null);

export const StockValues = type({
	"stockKg?": PositiveNumber.or(type.null),
	"stockNmoins1kg?": PositiveNumber.or(type.null),
}).or(type.null);

export const StockValuesNaissain = type({
	"stockMilliers?": PositiveNumber.or(type.null),
	"stockM?": PositiveNumber.or(type.null),
	"stockNmoins1milliers?": PositiveNumber.or(type.null),
}).or(type.null);

export const DeclarationSchema = type({
	etapes: {
		entrepriseValidee: "boolean",
		concessionValidee: "boolean",
		stockValidee: "boolean",
		productionValidee: "boolean",
		envoiValidee: "boolean",
		declarationValidee: "boolean",
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
	equipe: {},
	production: {
		// TODO ESPECES.id
		"[string]": type({
			"validation?": {
				"elevage?": "boolean",
				"origine?": "boolean",
				"zones?": "boolean",
			},
			"naissain?": {
				"total?": StockValuesNaissain,
				"captage?": StockValuesNaissain,
				"ecloserie?": StockValuesNaissain,
			},
			"elevage?": {
				"pregrossissement?": StockValues,
				"demiElevage?": StockValues,
				"adulte?": StockValues,
			},
			"origine?": {},
			"zonesProduction?": [
				{
					zone: type.enumerated(QUARTIERS_IMMATRICULATION_IDS),
					surfaceHa: PositiveNumber,
				},
			],
		}),
	},
	ventes: {
		// TODO ESPECES.id
		"[string]": {
			"validation?": {
				"naissain?": "boolean",
				"elevage?": "boolean",
				"consommation?": "boolean",
				"origine?": "boolean",
			},

			"naissain?": {
				"captage?": {
					"destination?": {
						"france?": ValeurVente,
						"etranger?": ValeurVente,
					},
				},
				"ecloserieDiploide?": {
					"destination?": {
						"france?": ValeurVente,
						"etranger?": ValeurVente,
					},
				},
				"ecloserieTriploide?": {
					"destination?": {
						"france?": ValeurVente,
						"etranger?": ValeurVente,
					},
				},
			},
			"elevage?": {
				"pregrossi?": {
					"destination?": {
						// 1.2 + Agreste 1.7.2,
						"france?": ValeurVente,
						"etranger?": ValeurVente,
					},
				},
				"demiElevage?": {
					"destination?": {
						"france?": ValeurVente,
						"etranger?": ValeurVente,
					},
				},
				"adulte?": {
					"destination?": {
						"france?": ValeurVente,
						"etranger?": ValeurVente,
					},
				},
			},
			"consommation?": {
				"modeElevage?": {
					// TODO MODE_ELEVAGE.id
					"[string]": {
						// pourcentage OU
						// valeurHT
					},
				},
				"destination?": {
					"france?": {
						// TODO DESTINATIONS_VENTES_CONSO_FRANCE.id
						"[string]": ValeurVente,
					},
					"unionEuropeenne?": ValeurVente,
					"horsUnionEuropeenne?": ValeurVente,
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
		},
	},
	retourAnnee: {
		aleas: type.enumerated(...ALEAS_IDS).array(),
		aleasDetails: "string | null = null",
		difficultes: "string | null = null",
		suggestions: "string | null = null",
		raisonsInactivite: "string | null = null",
	},
});

export type DeclarationSchema = typeof DeclarationSchema.infer;
