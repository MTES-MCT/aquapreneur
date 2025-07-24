import defaultsDeep from "lodash/defaultsDeep";

import {
	type DESTINATION_VENTES_CONSO_FRANCE_ID,
	type ESPECES_ID,
	ESPECES_IDS,
} from "./constants";

import type { DeclarationSchema } from "./schemas/declaration-schema";

export const aVenduNaissains = (donnees: DeclarationSchema) => {
	return ESPECES_IDS.some((especeId) =>
		ventesParEspece(donnees, especeId).naissain.active(),
	);
};

export const ventesParEspece = (
	donnees: DeclarationSchema,
	especeId: ESPECES_ID,
) => {
	const d = donnees.ventes?.[especeId];
	return {
		active: () => {
			return d != null;
		},
		enable: () => {
			defaultsDeep(donnees, { ventes: { [especeId]: {} } });
		},
		disable: () => {
			delete donnees.ventes?.[especeId];
		},
		naissain: {
			active: () => {
				return d?.naissain != null;
			},
			enable: () => {
				defaultsDeep(donnees, {
					ventes: { [especeId]: { naissains: {} } },
				});
			},
			disable: () => {
				delete d?.naissain;
			},
		},
		consommation: {
			get validé() {
				return d?.consommation?.validé != null;
			},
			set validé(val: boolean) {
				defaultsDeep(donnees, {
					ventes: { [especeId]: { consommation: { validé: val } } },
				});
			},
			active: () => {
				return d?.consommation != null;
			},
			enable: () => {
				defaultsDeep(donnees, {
					ventes: { [especeId]: { consommation: {} } },
				});
			},
			disable: () => {
				delete d?.consommation;
			},
			destination: {
				france: {
					active: () => {
						return d?.consommation?.destination?.france != null;
					},
					enable: () => {
						defaultsDeep(donnees, {
							ventes: {
								[especeId]: {
									consommation: { destination: { france: {} } },
								},
							},
						});
					},
					disable: () => {
						delete d?.consommation?.destination?.france;
					},
					detail: (detailId: DESTINATION_VENTES_CONSO_FRANCE_ID) => ({
						active: () => {
							return d?.consommation?.destination?.france?.[detailId] != null;
						},
						enable: () => {
							defaultsDeep(donnees, {
								ventes: {
									[especeId]: {
										consommation: {
											destination: { france: { [detailId]: {} } },
										},
									},
								},
							});
						},
						disable: () => {
							delete d?.consommation?.destination?.france?.[detailId];
						},
					}),
				},
				unionEuropeenne: {
					active: () => {
						return d?.consommation?.destination?.unionEuropeenne != null;
					},
					enable: () => {
						defaultsDeep(donnees, {
							ventes: {
								[especeId]: {
									consommation: {
										destination: { unionEuropeenne: {} },
									},
								},
							},
						});
					},
					disable: () => {
						delete d?.consommation?.destination?.unionEuropeenne;
					},
				},
				horsUnionEuropeenne: {
					active: () => {
						return d?.consommation?.destination?.horsUnionEuropeenne != null;
					},
					enable: () => {
						defaultsDeep(donnees, {
							ventes: {
								[especeId]: {
									consommation: { destination: { horsUnionEuropeenne: {} } },
								},
							},
						});
					},
					disable: () => {
						delete d?.consommation?.destination?.horsUnionEuropeenne;
					},
				},
			},
		},
		elevage: {
			get validé() {
				return d?.elevage?.validé != null;
			},
			set validé(val: boolean) {
				defaultsDeep(donnees, {
					ventes: { [especeId]: { elevage: { validé: val } } },
				});
			},
			active: () => {
				return d?.elevage != null;
			},
			enable: () => {
				defaultsDeep(donnees, {
					ventes: { [especeId]: { elevage: {} } },
				});
			},
			disable: () => {
				delete d?.elevage;
			},
			pregrossi: {
				active: () => {
					return d?.elevage?.pregrossi != null;
				},
				enable: () => {
					defaultsDeep(donnees, {
						ventes: {
							[especeId]: {
								elevage: { pregrossi: {} },
							},
						},
					});
				},
				disable: () => {
					delete d?.elevage?.pregrossi;
				},
				destination: {
					france: {
						active: () => {
							return d?.elevage?.pregrossi?.destination?.france != null;
						},
						enable: () => {
							defaultsDeep(donnees, {
								ventes: {
									[especeId]: {
										elevage: { pregrossi: { destination: { france: {} } } },
									},
								},
							});
						},
						disable: () => {
							delete d?.elevage?.pregrossi?.destination?.france;
						},
					},
					etranger: {
						active: () => {
							return d?.elevage?.pregrossi?.destination?.etranger != null;
						},
						enable: () => {
							defaultsDeep(donnees, {
								ventes: {
									[especeId]: {
										elevage: {
											pregrossi: { destination: { etranger: {} } },
										},
									},
								},
							});
						},
						disable: () => {
							delete d?.elevage?.pregrossi?.destination?.etranger;
						},
					},
				},
			},
			demiElevage: {
				active: () => {
					return d?.elevage?.demiElevage != null;
				},
				enable: () => {
					defaultsDeep(donnees, {
						ventes: {
							[especeId]: {
								elevage: { demiElevage: {} },
							},
						},
					});
				},
				disable: () => {
					delete d?.elevage?.demiElevage;
				},
				destination: {
					france: {
						active: () => {
							return d?.elevage?.demiElevage?.destination?.france != null;
						},
						enable: () => {
							defaultsDeep(donnees, {
								ventes: {
									[especeId]: {
										elevage: { demiElevage: { destination: { france: {} } } },
									},
								},
							});
						},
						disable: () => {
							delete d?.elevage?.demiElevage?.destination?.france;
						},
					},
					etranger: {
						active: () => {
							return d?.elevage?.demiElevage?.destination?.etranger != null;
						},
						enable: () => {
							defaultsDeep(donnees, {
								ventes: {
									[especeId]: {
										elevage: {
											demiElevage: { destination: { etranger: {} } },
										},
									},
								},
							});
						},
						disable: () => {
							delete d?.elevage?.demiElevage?.destination?.etranger;
						},
					},
				},
			},
			adulte: {
				active: () => {
					return d?.elevage?.adulte != null;
				},
				enable: () => {
					defaultsDeep(donnees, {
						ventes: {
							[especeId]: {
								elevage: { adulte: {} },
							},
						},
					});
				},
				disable: () => {
					delete d?.elevage?.adulte;
				},
				destination: {
					france: {
						active: () => {
							return d?.elevage?.adulte?.destination?.france != null;
						},
						enable: () => {
							defaultsDeep(donnees, {
								ventes: {
									[especeId]: {
										elevage: { adulte: { destination: { france: {} } } },
									},
								},
							});
						},
						disable: () => {
							delete d?.elevage?.adulte?.destination?.france;
						},
					},
					etranger: {
						active: () => {
							return d?.elevage?.adulte?.destination?.etranger != null;
						},
						enable: () => {
							defaultsDeep(donnees, {
								ventes: {
									[especeId]: {
										elevage: {
											adulte: {
												destination: { etranger: {} },
											},
										},
									},
								},
							});
						},
						disable: () => {
							delete d?.elevage?.adulte?.destination?.etranger;
						},
					},
				},
			},
		},
	};
};
