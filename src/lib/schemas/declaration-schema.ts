import { type } from "arktype";

import { Email, IsoDate, Percent, PositiveNumber, Siret } from "$lib/types";

export const Zone = type("'Nord - Pas-de-Calais' | 'Baie de Somme'");

export const Repartition = type(
	{
		part: Percent,
		repartition: Zone,
	},
	"[]",
);

export const DeclarationSchema = type({
	etapes: {
		entrepriseValidee: "boolean",
		concessionValidee: "boolean",
		stockValidee: "boolean",
		productionValidee: "boolean",
		envoiValidee: "boolean",
		declarationValidee: "boolean",
	},
	commentaires: {
		erreursConcessions: "string | null = null",
		evnmtsExceptionnels: "string | null = null",
		erreursFormulaire: "string | null = null",
		suggestions: "string | null = null",
	},
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
		denomination: "string | null",
		codeActivitePrincipale: "string | null",
		activitePrincipale: "string | null",
		adresse: "string | null",
		codePostal: "string | null",
		commune: "string | null",
	},
	especes: {
		huitresCreuses: {
			surfaceExploitation: PositiveNumber.or(type.null),
			achats: {
				naissains: {
					// en milliers
					quantite: PositiveNumber.or(type.null),
				},
				juveniles: {
					quantite: PositiveNumber.or(type.null),
				},
				adultes: {
					quantite: PositiveNumber.or(type.null),
				},
			},
			ventes: {
				naissains: {
					total: PositiveNumber.or(type.null),
				},
				juveniles: {
					total: PositiveNumber.or(type.null),
				},
				adultes: {
					total: PositiveNumber.or(type.null),
					degustation: PositiveNumber.or(type.null),
					autres: PositiveNumber.or(type.null),
				},
			},
			stock: {
				naissains: {
					quantite: PositiveNumber.or(type.null).describe("en milliers"),
					repartition: Repartition.or(type.null),
				},
				juveniles: {
					quantite: PositiveNumber.or(type.null).describe("en milliers"),
					repartition: Repartition.or(type.null),
				},
				adultes: {
					quantite: PositiveNumber.or(type.null).describe("en milliers"),
					repartition: Repartition.or(type.null),
				},
			},
		},
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
