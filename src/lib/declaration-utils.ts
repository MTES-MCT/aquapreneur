import defaultsDeep from "lodash/defaultsDeep";

import {
	type DESTINATIONS_VENTES_CONSO_FRANCE_ID,
	type ESPECES_ID,
	ESPECES_IDS,
} from "./constants";

import type { DeclarationSchema } from "./schemas/declaration-schema";

export const aVenduNaissains = (donnees: DeclarationSchema) => {
	return ESPECES_IDS.some((especeId) =>
		dVentes(donnees, especeId).naissain.active(),
	);
};

export const dVentes = (donnees: DeclarationSchema, especeId: ESPECES_ID) => {
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

		consommation: {
			get validé() {
				return d?.consommation?.validé != null;
			},
			set validé(val: boolean) {
				defaultsDeep(donnees, {
					ventes: { [especeId]: { consommation: { validé: val } } },
				});
			},
			get origineValidé() {
				return d?.consommation?.origineValidé != null;
			},
			set origineValidé(val: boolean) {
				defaultsDeep(donnees, {
					ventes: { [especeId]: { consommation: { origineValidé: val } } },
				});
			},
			active: () => {
				return d?.consommation != null;
			},
			enable: () => {
				defaultsDeep(donnees, {
					ventes: {
						[especeId]: {
							consommation: {
								affinage: {
									claires: {},
									parcs: {},
								},
								bio: {},
								origine: {},
							},
						},
					},
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
					detail: (detailId: DESTINATIONS_VENTES_CONSO_FRANCE_ID) => ({
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
								elevage: { pregrossi: { destination: {} } },
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
								elevage: { demiElevage: { destination: {} } },
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
								elevage: { adulte: { destination: {} } },
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
		naissain: {
			get validé() {
				return d?.naissain?.validé != null;
			},
			set validé(val: boolean) {
				defaultsDeep(donnees, {
					ventes: { [especeId]: { naissain: { validé: val } } },
				});
			},
			active: () => {
				return d?.naissain != null;
			},
			enable: () => {
				defaultsDeep(donnees, {
					ventes: { [especeId]: { naissain: {} } },
				});
			},
			disable: () => {
				delete d?.naissain;
			},
			captage: {
				active: () => {
					return d?.naissain?.captage != null;
				},
				enable: () => {
					defaultsDeep(donnees, {
						ventes: {
							[especeId]: {
								naissain: { captage: { destination: {} } },
							},
						},
					});
				},
				disable: () => {
					delete d?.naissain?.captage;
				},
				destination: {
					france: {
						active: () => {
							return d?.naissain?.captage?.destination?.france != null;
						},
						enable: () => {
							defaultsDeep(donnees, {
								ventes: {
									[especeId]: {
										naissain: { captage: { destination: { france: {} } } },
									},
								},
							});
						},
						disable: () => {
							delete d?.naissain?.captage?.destination?.france;
						},
					},
					etranger: {
						active: () => {
							return d?.naissain?.captage?.destination?.etranger != null;
						},
						enable: () => {
							defaultsDeep(donnees, {
								ventes: {
									[especeId]: {
										naissain: {
											captage: { destination: { etranger: {} } },
										},
									},
								},
							});
						},
						disable: () => {
							delete d?.naissain?.captage?.destination?.etranger;
						},
					},
				},
			},
			ecloserieDiploide: {
				active: () => {
					return d?.naissain?.ecloserieDiploide != null;
				},
				enable: () => {
					defaultsDeep(donnees, {
						ventes: {
							[especeId]: {
								naissain: { ecloserieDiploide: { destination: {} } },
							},
						},
					});
				},
				disable: () => {
					delete d?.naissain?.ecloserieDiploide;
				},
				destination: {
					france: {
						active: () => {
							return (
								d?.naissain?.ecloserieDiploide?.destination?.france != null
							);
						},
						enable: () => {
							defaultsDeep(donnees, {
								ventes: {
									[especeId]: {
										naissain: {
											ecloserieDiploide: { destination: { france: {} } },
										},
									},
								},
							});
						},
						disable: () => {
							delete d?.naissain?.ecloserieDiploide?.destination?.france;
						},
					},
					etranger: {
						active: () => {
							return (
								d?.naissain?.ecloserieDiploide?.destination?.etranger != null
							);
						},
						enable: () => {
							defaultsDeep(donnees, {
								ventes: {
									[especeId]: {
										naissain: {
											ecloserieDiploide: { destination: { etranger: {} } },
										},
									},
								},
							});
						},
						disable: () => {
							delete d?.naissain?.ecloserieDiploide?.destination?.etranger;
						},
					},
				},
			},
			ecloserieTriploide: {
				active: () => {
					return d?.naissain?.ecloserieTriploide != null;
				},
				enable: () => {
					defaultsDeep(donnees, {
						ventes: {
							[especeId]: {
								naissain: { ecloserieTriploide: { destination: {} } },
							},
						},
					});
				},
				disable: () => {
					delete d?.naissain?.ecloserieTriploide;
				},
				destination: {
					france: {
						active: () => {
							return (
								d?.naissain?.ecloserieTriploide?.destination?.france != null
							);
						},
						enable: () => {
							defaultsDeep(donnees, {
								ventes: {
									[especeId]: {
										naissain: {
											ecloserieTriploide: { destination: { france: {} } },
										},
									},
								},
							});
						},
						disable: () => {
							delete d?.naissain?.ecloserieTriploide?.destination?.france;
						},
					},
					etranger: {
						active: () => {
							return (
								d?.naissain?.ecloserieTriploide?.destination?.etranger != null
							);
						},
						enable: () => {
							defaultsDeep(donnees, {
								ventes: {
									[especeId]: {
										naissain: {
											ecloserieTriploide: {
												destination: { etranger: {} },
											},
										},
									},
								},
							});
						},
						disable: () => {
							delete d?.naissain?.ecloserieTriploide?.destination?.etranger;
						},
					},
				},
			},
		},
	};
};
