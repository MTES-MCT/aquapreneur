import _ from "lodash";
import { beforeAll, describe, expect, test } from "vitest";

import { deepClean } from "./utils";

beforeAll(async () => {});

describe("Tests de manipulation des déclarations", async () => {
	test("`deepClean` supprime les clés nulles et indéfinies", async () => {
		const declaration = { a: "a", b: null, c: undefined };
		expect(deepClean(declaration)).toEqual({ a: "a" });
	});

	test("`deepClean` supprime les clés nulles et indéfinies de façon récursive", async () => {
		const declaration = {
			a: "a",
			b: null,
			c: undefined,
			e: { f: "f", g: null, h: undefined },
		};
		expect(deepClean(declaration)).toEqual({ a: "a", e: { f: "f" } });
	});

	test("`deepClean` supprime les clés nulles, indéfinies et vides de façon récursive", async () => {
		const declaration = {
			a: "a",
			b: null,
			c: undefined,
			d: {},
			e: { f: "f", g: null, h: undefined, i: {} },
		};
		expect(deepClean(declaration)).toEqual({ a: "a", e: { f: "f" } });
	});

	test("`deepClean` supprime recursivement les clés qui deviennent nulles", async () => {
		const declaration1 = {
			a: "a",
			b: { c: null },
		};
		expect(deepClean(declaration1)).toEqual({ a: "a" });

		const declaration2 = {
			a: "a",
			b: null,
			c: undefined,
			d: {},
			e: { g: null, h: undefined, i: { a: null, b: { c: {} } } },
		};

		expect(deepClean(declaration2)).toEqual({ a: "a" });
	});

	test("`test réel", async () => {
		const declaration = {
			commentaires: {
				erreursConcessions: null,
				erreursFormulaire: null,
				evnmtsExceptionnels: null,
				suggestions: null,
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
				emailContact: null,
				telContact: null,
				telEntreprise: null,
			},
			etablissement: {
				siret: "xxx",
				denomination: "yyy",
			},
			dateBilan: "2025-03-01",
			debutExercice: "2023-06-01",
			finExercice: "2024-05-01",
			achats: {
				huitreCreuse: {
					naissains: { quantite: 400 },
					juveniles: { quantite: 9000 },
					adultes: { quantite: 2000 },
				},
			},
			ventes: {
				huitreCreuse: {
					naissains: { total: 0 },
					juveniles: { total: 12000 },
					adultes: {
						total: 50000,
						consommation: {
							destination: {
								france: {
									degustation: null,
									autresVentesParticuliers: { valeurHT: 15000 },
									autresConchyliculteurs: { valeurHT: 30000 },
									restaurateursTraiteurs: null,
									poissoniersEcaillers: null,
									grandesMoyennesSurfaces: null,
									mareyeursGrossistes: null,
								},
								unionEuropeenne: null,
								horsUnionEuropeenne: null,
							},
						},
						elevage: {},
					},
				},
			},
			stocks: {
				huitreCreuse: {
					surfaceExploitation: 0,
					naissains: { quantite: 4000, repartition: [] },
					juveniles: { quantite: 48000, repartition: [] },
					adultes: { quantite: 50000, repartition: [] },
				},
			},
			concessions: [],
		};

		expect(deepClean(declaration)).toEqual({
			etapes: {
				concessionValidee: false,
				declarationValidee: false,
				entrepriseValidee: false,
				envoiValidee: false,
				productionValidee: false,
				stockValidee: false,
			},
			etablissement: {
				siret: "xxx",
				denomination: "yyy",
			},
			dateBilan: "2025-03-01",
			debutExercice: "2023-06-01",
			finExercice: "2024-05-01",
			achats: {
				huitreCreuse: {
					naissains: { quantite: 400 },
					juveniles: { quantite: 9000 },
					adultes: { quantite: 2000 },
				},
			},
			ventes: {
				huitreCreuse: {
					juveniles: { total: 12000 },
					adultes: {
						total: 50000,
						consommation: {
							destination: {
								france: {
									autresVentesParticuliers: { valeurHT: 15000 },
									autresConchyliculteurs: { valeurHT: 30000 },
								},
							},
						},
					},
				},
			},
			stocks: {
				huitreCreuse: {
					naissains: { quantite: 4000 },
					juveniles: { quantite: 48000 },
					adultes: { quantite: 50000 },
				},
			},
		});
	});
});
