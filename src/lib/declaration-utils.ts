import defaultsDeep from "lodash/defaultsDeep";

import {
	type DestinationVenteConsoFranceId,
	ESPECES_IDS,
	type EspeceId,
} from "./constants";

import type { DonneesDeclaration } from "./schemas/donnees-declaration-schema";

export const aVenduNaissains = (donnees: DonneesDeclaration) => {
	return ESPECES_IDS.some((especeId) =>
		dVentes(donnees, especeId).naissain.active(),
	);
};

export const dProd = (donnees: DonneesDeclaration, especeId: EspeceId) => {
	const d = donnees.production?.[especeId];

	return {
		active: () => {
			return d != null;
		},
		enable: () => {
			defaultsDeep(donnees, { production: { [especeId]: {} } });
		},
		disable: () => {
			delete donnees.production?.[especeId];
		},
	};
};

export const dVentes = (donnees: DonneesDeclaration, especeId: EspeceId) => {
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
				return d?.validation?.consommation != null;
			},
			set validé(val: boolean) {
				defaultsDeep(donnees, {
					ventes: { [especeId]: { validation: { consommation: val } } },
				});
			},
			get origineValidé() {
				return d?.validation?.origine != null;
			},
			set origineValidé(val: boolean) {
				defaultsDeep(donnees, {
					ventes: { [especeId]: { validation: { origine: val } } },
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
					detail: (detailId: DestinationVenteConsoFranceId) => ({
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
				return d?.validation?.elevage != null;
			},
			set validé(val: boolean) {
				defaultsDeep(donnees, {
					ventes: { [especeId]: { validation: { elevage: val } } },
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
				return d?.validation?.naissain != null;
			},
			set validé(val: boolean) {
				defaultsDeep(donnees, {
					ventes: { [especeId]: { validation: { naissain: val } } },
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
