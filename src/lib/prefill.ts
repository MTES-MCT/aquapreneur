import { and, desc, eq, ne, sql } from "drizzle-orm";

import { db } from "$lib/server/db";
import { bilans } from "$lib/server/db/schema/api";

// import { concessionsTable } from "$lib/server/db/schema/atena";

import { type LaxNumValue } from "./schemas/cgo-schema";
import { DeclarationSchema } from "./schemas/declaration-schema";
import { deepClean } from "./utils";

import type { EtablissementSelect } from "./server/db/types";

// import type { ConcessionSelect } from "./server/db/types";

// const getSurfaceHa = (concessions: ConcessionSelect[]) => {
// 	return Math.round(
// 		concessions
// 			.filter((c) => {
// 				return c.estEspecePrincipale === 1 && c.espece === "Huître creuse";
// 			})
// 			.reduce((acc, current) => {
// 				const surface = current.surfaceParcelle ?? 0;
// 				const surfHa =
// 					current.codeUniteMesure === "M2" ? surface * 0.0001 : surface * 0.01;
// 				return acc + surfHa;
// 			}, 0),
// 	);
// };

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

export const getBilan = async (siret: string, annee: number) => {
	const result = await db
		.select()
		.from(bilans)
		.where(
			and(
				ne(bilans.invalide, true),
				eq(bilans.siret, siret),
				eq(sql<string>`DATE_PART('year', ${bilans.finExercice})`, annee),
			),
		)
		.orderBy(desc(bilans.version))
		.limit(1);

	if (result.length === 1) {
		// TODO log à supprimer après tests
		const bilan = result[0];
		console.log(
			bilan.id,
			bilan.siret,
			bilan.nom,
			bilan.debutExercice,
			bilan.finExercice,
			bilan.version,
			bilan.invalide,
			bilan.dateBilan,
		);
		return result[0];
	}
	return null;
};

// const getConcessions = (siren: string) => {
// 	return db
// 		.select()
// 		.from(concessionsTable)
// 		.where(eq(concessionsTable.siren, siren))
// 		.orderBy(
// 			concessionsTable.quartierParcelle,
// 			concessionsTable.libLocalite,
// 			concessionsTable.nomLieuDit,
// 			concessionsTable.numeroParcelle,
// 		);
// };

export const prefillDeclaration = async (
	etablissement: EtablissementSelect,
	annee: number,
): Promise<DeclarationSchema> => {
	const bilan = await getBilan(etablissement.siret, annee);
	// const concessions = await getConcessions(etablissement.siren);
	const d = bilan?.donnees;

	const declaration = DeclarationSchema.assert({
		aProduit: true, // TODO
		commentaires: {
			aleas: [],
			aleasDetails: null,
			difficultes: null,
			suggestions: null,
			raisonsInactivite: null,
		},
		etapes: {
			entrepriseValidee: false,
			concessionValidee: false,
			stockValidee: false,
			productionValidee: false,
			envoiValidee: false,
			declarationValidee: false,
		},
		entreprise: {
			emailEntreprise: null,
		},
		etablissement: {
			siret: etablissement.siret,
			denomination: etablissement.denomination,
			codeActivitePrincipale: etablissement.codeActivitePrincipale,
			activitePrincipale: etablissement.activitePrincipale,
			adresse: etablissement.adresse,
			codePostal: etablissement.codePostal,
			commune: etablissement.commune,
		},
		dateBilan: bilan?.dateBilan ?? null,
		debutExercice: bilan?.debutExercice ?? null,
		finExercice: bilan?.finExercice ?? null,
		achats: {},
		// TODO
		// deepClean({
		// 	huitreCreuse: {
		// 		naissain: {
		// 			quantite: d?.donnees_economiques.VolAchHNaiss,
		// 		},
		// 		demiElevage: { quantite: d?.donnees_economiques.VolAchHDElv },
		// 		adulte: {
		// 			quantite: sumAttrs(d?.donnees_economiques, [
		// 				"VolAchHElv",
		// 				"VolAchHConso",
		// 			]),
		// 		},
		// 	},
		// }),
		production: deepClean({
			huitreCreuse: {
				naissain: {
					valeurHTMi: d?.stock.StckValHNaisMi,
					valeurHT: d?.stock.StckValHNaisKg,
					volumeMi: d?.stock.StckVolHNaisMi,
					volume: d?.stock.StckVolHNaisKg,
				},
				elevage: {
					demiElevage: {
						valeurHT: d?.stock.StckValHDElv,
						volume: d?.stock.StckVolHDElv,
					},
					adulte: {
						valeurHT: d?.stock.StckValHElv,
						volume: d?.stock.StckVolHElv,
					},
				},
				consommation: {
					valeurHT: d?.stock.StckValHConso,
					volume: d?.stock.StckVolHConso,
				},
			},
			mouleCommune: {
				naissain: {
					valeurHT: d?.stock.StckValMNaiss,
					volume: d?.stock.StckVolMNaiss,
				},
				elevage: {
					demiElevage: {
						valeurHT: d?.stock.StckValMDElv,
						volume: d?.stock.StckVolMDElv,
					},
				},
				consommation: {
					valeurHT: d?.stock.StckValMConso,
					volume: d?.stock.StckVolMConso,
				},
			},
			palourde: {
				naissain: {
					valeurHT: d?.stock.StckValPNaiss,
					volume: d?.stock.StckVolPNaiss,
				},
				elevage: {
					demiElevage: {
						valeurHT: d?.stock.StckValPDElv,
						volume: d?.stock.StckVolPDElv,
					},
				},
				consommation: {
					valeurHT: d?.stock.StckValPConso,
					volume: d?.stock.StckVolPConso,
				},
			},
		}),
		ventes: deepClean({
			huitreCreuse: {
				naissain: {
					// TODO c’est incorrect, l’API renvoie une valeur totale pour les naissains
					// on n’a pas la ventilation par origine
					captage: {
						destination: {
							france: { valeurHT: d?.production.CAHNaissFr },
							etranger: {
								valeurHT: sumAttrs(d?.production, ["CAHNaissUE", "CAHNaissAu"]),
							},
						},
					},
				},
				elevage: {
					demiElevage: {
						destination: {
							france: { valeurHT: d?.production.CAHDElvFr },
							etranger: {
								valeurHT: sumAttrs(d?.production, ["CAHDElvUE", "CAHDElvAU"]),
							},
						},
					},
					adulte: {
						destination: {
							france: { valeurHT: d?.production.CAHElvFr },
							etranger: {
								valeurHT: sumAttrs(d?.production, ["CAHElvUE", "CAHElvAu"]),
							},
						},
					},
				},
				consommation: {
					destination: {
						france: {
							degustation: { valeurHT: d?.production.CAHCoFrDeg },
							autresVentesParticuliers: {
								valeurHT: d?.production.CAHCoFrDet,
							},
							autresConchyliculteurs: {
								valeurHT: d?.production.CAHCoFrPro,
							},
							restaurateursTraiteurs: null,
							poissoniersEcaillers: {
								valeurHT: d?.production.CAHCoFrPCE,
							},
							grandesMoyennesSurfaces: {
								valeurHT: d?.production.CAHCoFrPGMS,
							},
							mareyeursGrossistes: {
								valeurHT: d?.production.CAHCoFrGros,
							},
						},
						unionEuropeenne: {
							valeurHT: d?.production.CAHCoUEGros,
						},
						horsUnionEuropeenne: {
							valeurHT: d?.production.CAHCoAuGros,
						},
						// TODO: manque CAHCoUEPro et CAHCoAuPro (export en gros, UE et non UE)
					},
				},

				// Manque “Non catégorisées” CAHFrNCat
			},
			mouleCommune: {
				naissain: {
					// TODO c’est incorrect, l’API renvoie une valeur totale pour les naissains
					// on n’a pas la ventilation par origine
					captage: {
						destination: {
							france: { valeurHT: d?.production.CAMNaissFr },
							etranger: {
								valeurHT: sumAttrs(d?.production, ["CAMNaissUE", "CAMNaissAu"]),
							},
						},
					},
				},
				elevage: {
					demiElevage: {
						destination: {
							france: { valeurHT: d?.production.CAMDElvFr },
							etranger: {
								valeurHT: sumAttrs(d?.production, ["CAMDElvUE", "CAMDElvAU"]),
							},
						},
					},
				},
				consommation: {
					destination: {
						france: {
							degustation: { valeurHT: d?.production.CAMCoFrDeg },
							autresVentesParticuliers: {
								valeurHT: d?.production.CAMCoFrDet,
							},
							autresConchyliculteurs: {
								valeurHT: d?.production.CAMCoFrPro,
							},
							restaurateursTraiteurs: null,
							poissoniersEcaillers: {
								valeurHT: d?.production.CAMCoFrPCE,
							},
							grandesMoyennesSurfaces: {
								valeurHT: d?.production.CAMCoFrPGMS,
							},
							mareyeursGrossistes: {
								valeurHT: d?.production.CAMCoFrGros,
							},
						},
						unionEuropeenne: {
							valeurHT: d?.production.CAMCoUEGros,
						},
						horsUnionEuropeenne: {
							valeurHT: d?.production.CAMCoAuGros,
						},
						// TODO: manque CAMCoUEPro et CAMCoAuPro (export en gros, UE et non UE)
					},
				},
				// Manque “Non catégorisées” CAMFrNCat
			},
			palourde: {
				naissain: {
					// TODO c’est incorrect, l’API renvoie une valeur totale pour les naissains
					// on n’a pas la ventilation par origine
					captage: {
						destination: {
							france: { valeurHT: d?.production.CAPNaissFr },
							etranger: {
								valeurHT: sumAttrs(d?.production, ["CAPNaissUE", "CAPNaissAu"]),
							},
						},
					},
				},
				elevage: {
					demiElevage: {
						destination: {
							france: { valeurHT: d?.production.CAPDElvFr },
							etranger: {
								valeurHT: sumAttrs(d?.production, ["CAPDElvUE", "CAPDElvAU"]),
							},
						},
					},
				},
				consommation: {
					destination: {
						france: {
							degustation: { valeurHT: d?.production.CAPCoFrDeg },
							autresVentesParticuliers: {
								valeurHT: d?.production.CAPCoFrDet,
							},
							autresConchyliculteurs: {
								valeurHT: d?.production.CAPCoFrPro,
							},
							restaurateursTraiteurs: null,
							poissoniersEcaillers: {
								valeurHT: d?.production.CAPCoFrPCE,
							},
							grandesMoyennesSurfaces: {
								valeurHT: d?.production.CAPCoFrPGMS,
							},
							mareyeursGrossistes: {
								valeurHT: d?.production.CAPCoFrGros,
							},
						},
						unionEuropeenne: {
							valeurHT: d?.production.CAPCoUEGros,
						},
						horsUnionEuropeenne: {
							valeurHT: d?.production.CAPCoAuGros,
						},
						// TODO: manque CAPCoUEPro et CAPCoAuPro (export en gros, UE et non UE)
					},
				},

				// Manque “Non catégorisées” CAPFrNCat
			},
		}),
		// TODO
		// deepClean({
		// 	huitreCreuse: {
		// 		surfaceExploitation: concessions ? getSurfaceHa(concessions) : null,
		// 		naissain: {
		// 			quantite: d?.stock.StckVolHNaisMi,
		// 			repartition: [],
		// 		},
		// 		demiElevage: {
		// 			quantite: d?.stock.StckVolHDElv,
		// 			repartition: [],
		// 		},
		// 		adulte: {
		// 			quantite: sumAttrs(d?.stock, ["StckVolHElv", "StckVolHConso"]),
		// 			repartition: [],
		// 		},
		// 	},
		// }),
		concessions: [],
		// On exclue temporairement les concessions de la déclaration
		// concessions: concessions.map((c) => ({
		// 	quartierParcelle: c.quartierParcelle,
		// 	libLocalite: c.libLocalite,
		// 	nomLieuDit: c.nomLieuDit,
		// 	numeroParcelle: c.numeroParcelle,
		// 	codeLocaliteInsee: c.codeLocaliteInsee,
		// 	nomSituation: c.nomSituation,
		// 	typeParcelle: c.typeParcelle,
		// 	surfaceParcelle: c.surfaceParcelle,
		// 	uniteMesure: c.uniteMesure,
		// 	etatParcelle: c.etatParcelle,
		// 	familleExploitation: c.familleExploitation,
		// 	exploitation: c.exploitation,
		// 	familleEspece: c.familleEspece,
		// 	espece: c.espece,
		// 	natureJuridique: c.natureJuridique,
		// 	numArrete: c.numArrete,
		// 	dateArrete: c.dateArrete,
		// })),
	});
	// console.dir(deepClean(d?.production ?? {}), { depth: null });
	// console.dir(declaration.production, { depth: null });
	return declaration;
};
