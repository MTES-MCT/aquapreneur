import defaultsDeep from "lodash/defaultsDeep";

import {
	type DESTINATION_VENTES_CONSO_FRANCE_ID,
	type ESPECES_ID,
	ESPECES_IDS,
} from "./constants";

import type { DeclarationSchema } from "./schemas/declaration-schema";

export const getVentesConsommation = (
	donnees: DeclarationSchema,
	especeId: ESPECES_ID,
): boolean => {
	return donnees.ventes?.[especeId]?.adultes?.consommation != null;
};

export const aVenduNaissains = (donnees: DeclarationSchema) => {
	return ESPECES_IDS.some((especeId) =>
		ventesParEspece(donnees, especeId).naissain.active(),
	);
};

export const ventesParEspece = (
	donnees: DeclarationSchema,
	especeId: ESPECES_ID,
) => ({
	active: () => {
		return donnees.ventes?.[especeId] != null;
	},
	enable: () => {
		defaultsDeep(donnees, { ventes: { [especeId]: {} } });
	},
	disable: () => {
		delete donnees.ventes?.[especeId];
	},
	naissain: {
		active: () => {
			return (
				donnees.ventes?.[especeId]?.naissains != null &&
				donnees.ventes?.[especeId]?.naissains.total != 0
			);
		},
		enable: () => {
			defaultsDeep(donnees, {
				ventes: { [especeId]: { naissains: {} } },
			});
		},
		disable: () => {
			delete donnees.ventes?.[especeId]?.naissains;
		},
	},
	consommation: {
		// TODO remplacer par getter/setter
		validé: () => {
			return donnees.ventes?.[especeId]?.adultes?.consommation?.validé != null;
		},
		rendValide: () => {
			defaultsDeep(donnees, {
				ventes: { [especeId]: { adultes: { consommation: { validé: true } } } },
			});
		},
		active: () => {
			return donnees.ventes?.[especeId]?.adultes?.consommation != null;
		},
		enable: () => {
			defaultsDeep(donnees, {
				ventes: { [especeId]: { adultes: { consommation: {} } } },
			});
		},
		disable: () => {
			delete donnees.ventes?.[especeId]?.adultes?.consommation;
		},
		destination: {
			france: {
				active: () => {
					return (
						donnees.ventes?.[especeId]?.adultes?.consommation?.destination
							?.france != null
					);
				},
				enable: () => {
					defaultsDeep(donnees, {
						ventes: {
							[especeId]: {
								adultes: {
									consommation: { destination: { france: {} } },
								},
							},
						},
					});
				},
				disable: () => {
					delete donnees.ventes?.[especeId]?.adultes?.consommation?.destination
						?.france;
				},
				detail: (detailId: DESTINATION_VENTES_CONSO_FRANCE_ID) => ({
					active: () => {
						return (
							donnees.ventes?.[especeId]?.adultes?.consommation?.destination
								?.france?.[detailId] != null
						);
					},
					enable: () => {
						defaultsDeep(donnees, {
							ventes: {
								[especeId]: {
									adultes: {
										consommation: {
											destination: { france: { [detailId]: {} } },
										},
									},
								},
							},
						});
					},
					disable: () => {
						delete donnees.ventes?.[especeId]?.adultes?.consommation
							?.destination?.france?.[detailId];
					},
				}),
			},
			unionEuropeenne: {
				active: () => {
					return (
						donnees.ventes?.[especeId]?.adultes?.consommation?.destination
							?.unionEuropeenne != null
					);
				},
				enable: () => {
					defaultsDeep(donnees, {
						ventes: {
							[especeId]: {
								adultes: {
									consommation: {
										destination: {},
									},
								},
							},
						},
					});
					donnees.ventes[
						especeId
					]!.adultes!.consommation!.destination!.unionEuropeenne = {};
				},
				disable: () => {
					delete donnees.ventes?.[especeId]?.adultes?.consommation?.destination
						?.unionEuropeenne;
				},
			},
			horsUnionEuropeenne: {
				active: () => {
					return (
						donnees.ventes?.[especeId]?.adultes?.consommation?.destination
							?.horsUnionEuropeenne != null
					);
				},
				enable: () => {
					defaultsDeep(donnees, {
						ventes: {
							[especeId]: {
								adultes: {
									consommation: { destination: {} },
								},
							},
						},
					});
					donnees.ventes[
						especeId
					]!.adultes!.consommation!.destination!.horsUnionEuropeenne = {};
				},
				disable: () => {
					delete donnees.ventes?.[especeId]?.adultes?.consommation?.destination
						?.horsUnionEuropeenne;
				},
			},
		},
	},
});
