import { type } from "arktype";

import { IsoDate, Percent, PositiveInt, PositiveNumber } from "$lib/types";

export const Zone = type("'Nord - Pas-de-Calais' | 'Baie de Somme'");

export const Repartition = type(
	{
		part: Percent,
		repartition: Zone,
	},
	"[]",
);

export const Declaration = type({
	dateBilan: IsoDate.or(type.null),
	debutExercice: IsoDate.or(type.null),
	finExercice: IsoDate.or(type.null),
	entreprise: {},
	especes: {
		huitresCreuses: {
			surfaceExploitation: PositiveInt.or(type.null),
			achats: {
				naissains: {
					// en milliers
					quantite: PositiveInt.or(type.null),
				},
				juveniles: {
					quantite: PositiveInt.or(type.null),
				},
				adultes: {
					quantite: PositiveInt.or(type.null),
				},
			},
			ventes: {
				naissains: {
					total: PositiveInt.or(type.null),
				},
				juveniles: {
					total: PositiveInt.or(type.null),
				},
				adultes: {
					total: PositiveNumber.or(type.null),
					degustation: PositiveNumber.or(type.null),
					autres: PositiveNumber.or(type.null),
				},
			},
			stock: {
				naissains: {
					quantite: PositiveInt.or(type.null).describe("en milliers"),
					repartition: Repartition.or(type.null),
				},
				juveniles: {
					quantite: PositiveInt.or(type.null).describe("en milliers"),
					repartition: Repartition.or(type.null),
				},
				adultes: {
					quantite: PositiveInt.or(type.null).describe("en milliers"),
					repartition: Repartition.or(type.null),
				},
			},
		},
	},
});

console.dir(Declaration.toJsonSchema(), { depth: null });
export type Declaration = typeof Declaration.infer;
