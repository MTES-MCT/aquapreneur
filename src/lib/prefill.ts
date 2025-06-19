import type { bilans } from "$db/schema/api";
import type { Concession } from "$db/schema/atena";

import { type LaxNumValue } from "./schemas/cgo-schema";
import type { Declaration } from "./schemas/declaration-schema";

const getSurfaceHa = (concessions: Concession[]) => {
	return Math.round(
		concessions
			.filter((c) => {
				return c.estEspecePrincipale === 1 && c.espece === "Huître creuse";
			})
			.reduce((acc, current) => {
				const surface = current.surfaceParcelle ?? 0;
				const surfHa =
					current.codeUniteMesure === "M2" ? surface * 0.0001 : surface * 0.01;
				return acc + surfHa;
			}, 0),
	);
};

const sumAttrs = (
	obj: Record<string, LaxNumValue | unknown> | undefined,
	attrs: string[],
) => {
	if (obj == null) {
		return null;
	}
	return attrs.reduce((acc, currentKey) => {
		const val = obj[currentKey];
		if (typeof val === "number") {
			return acc + val;
		}
		return acc;
	}, 0);
};

export const prefillDeclaration = (
	bilanComptable: typeof bilans.$inferSelect | null,
	bilanComptableMoins1: typeof bilans.$inferSelect | null,
	concessions: Concession[] | null,
): Declaration => {
	// TODO : vérifier si on a un bilan CGO, et brancher sur le parsing CGO.
	// Sinon générer des valeurs nulles.
	const d = bilanComptable?.donnees;

	const declaration: Declaration = {
		entreprise: {},
		dateBilan: bilanComptable?.dateBilan ?? null,
		debutExercice: bilanComptable?.debutExercice ?? null,
		finExercice: bilanComptable?.finExercice ?? null,
		especes: {
			huitresCreuses: {
				surfaceExploitation: concessions ? getSurfaceHa(concessions) : null,
				stock: {
					naissains: {
						quantite: d?.stock.StckVolHNaisMi ?? null,
						repartition: [],
					},
					juveniles: {
						quantite: d?.stock.StckVolHDElv ?? null,
						repartition: [],
					},
					adultes: {
						quantite: sumAttrs(d?.stock, ["StckVolHElv", "StckVolHConso"]),
						repartition: [],
					},
				},
				ventes: {
					naissains: {
						total: sumAttrs(d?.production, [
							"CAHNaissFr",
							"CAHNaissUE",
							"CAHNaissAu",
						]),
					},
					juveniles: {
						total: sumAttrs(d?.production, [
							"CAHDElvFr",
							"CAHDElvUE",
							"CAHDElvAU",
						]),
					},
					adultes: {
						total: sumAttrs(d?.production, [
							// Elevage
							"CAHElvFr",
							"CAHElvUE",
							"CAHElvAu",
							// Consommation
							"CAHCoFrPro",
							"CAHCoFrDet",
							"CAHCoFrGros",
							"CAHCoFrPCE",
							"CAHCoFrPGMS",
							"CAHCoFrDeg",
							"CAHCoUEPro",
							"CAHCoUEGros",
							"CAHCoAuPro",
							"CAHCoAuGros",
						]),
						degustation: d?.production.CAHCoFrDeg ?? 0,
						autres: 0,
					},
				},
				achats: {
					naissains: {
						quantite: d?.donnees_economiques.VolAchHNaiss ?? 0,
					},
					juveniles: { quantite: d?.donnees_economiques.VolAchHDElv ?? 0 },
					adultes: {
						quantite:
							(d?.donnees_economiques.VolAchHElv ?? 0) +
							(d?.donnees_economiques.VolAchHConso ?? 0),
					},
				},
			},
		},
	};
	return declaration;
};
