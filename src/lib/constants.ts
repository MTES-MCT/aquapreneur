// Cookies

export const OIDC_STATE_COOKIE_NAME = "oidc_state";
export const OIDC_ID_TOKEN_COOKIE_NAME = "oidc_id_token";
export const SESSION_COOKIE_NAME = "session_id";
export const ADMIN_CURRENT_SIRET_COOKIE_NAME = "admin_current_siret";
export const DSFR_VERSION = "1.14.0";

export const ANNEES_DECLARATIVES = [2024, 2023, 2022, 2021, 2020] as const;

export const ESPECES = [
	{
		label: "Huître plate",
		id: "huitrePlate",
		slug: "huitre-plate",
	},
	{
		label: "Huître creuse",
		id: "huitreCreuse",
		slug: "huitre-creuse",
	},
	{
		label: "Moule commune",
		id: "mouleCommune",
		slug: "moule-commune",
	},
	{
		label: "Moule méditerranéenne",
		id: "mouleMediterraneenne",
		slug: "moule-mediterraneenne",
	},
	{
		label: "Palourde",
		id: "palourde",
		slug: "palourde",
	},
] as const;

export const ESPECES_IDS = ESPECES.map((e) => e.id);
export type ESPECES_ID = (typeof ESPECES_IDS)[number];
export const ESPECES_SLUGS = ESPECES.map((e) => e.slug);
export type ESPECES_SLUG = (typeof ESPECES_SLUGS)[number];

export const DESTINATIONS_VENTES_CONSO = [
	{
		label: "En France",
		id: "france",
	},
	{
		label: "À l’étranger, au sein de l’Union Européenne",
		id: "unionEuropeenne",
	},
	{
		label: "À l’étranger, hors de l’Union Européenne",
		id: "horsUnionEuropeenne",
	},
] as const;

export const DESTINATIONS_VENTES_CONSO_IDS = DESTINATIONS_VENTES_CONSO.map(
	(e) => e.id,
);
export type DESTINATIONS_VENTES_CONSO_ID =
	(typeof DESTINATIONS_VENTES_CONSO_IDS)[number];

export const DESTINATIONS_VENTES_CONSO_FRANCE = [
	{
		label: "Dégustation",
		id: "degustation",
	},
	{
		label: "Autres ventes directes aux particuliers",
		id: "autresVentesParticuliers",
	},
	{
		label: "Autres conchyliculteurs en achat/revente",
		id: "autresConchyliculteurs",
	},
	{
		label: "Restaurateurs, traiteurs",
		id: "restaurateursTraiteurs",
	},
	{
		label: "Poissonniers, écaillers",
		id: "poissoniersEcaillers",
	},
	{
		label: "Grandes et Moyennes surfaces",
		id: "grandesMoyennesSurfaces",
	},
	{
		label: "Mareyeurs, grossistes",
		id: "mareyeursGrossistes",
	},
] as const;

export const DESTINATIONS_VENTES_CONSO_FRANCE_IDS =
	DESTINATIONS_VENTES_CONSO_FRANCE.map((e) => e.id);
export type DESTINATIONS_VENTES_CONSO_FRANCE_ID =
	(typeof DESTINATIONS_VENTES_CONSO_FRANCE_IDS)[number];

export const STADES_ELEVAGE = [
	{
		label: "Prégrossi (18 mois)",
		id: "pregrossi",
	},
	{
		label: "Demi-élevage (24 mois)",
		id: "demiElevage",
	},
	{
		label: "Élevage (30 mois)",
		id: "adulte",
	},
] as const;

export const STADES_ELEVAGE_IDS = STADES_ELEVAGE.map((e) => e.id);
export type STADES_ELEVAGE_ID = (typeof STADES_ELEVAGE_IDS)[number];

export const DESTINATIONS_ELEVAGE = [
	{
		label: "En France",
		id: "france",
	},
	{
		label: "À l’étranger",
		id: "etranger",
	},
] as const;

export const DESTINATIONS_ELEVAGE_IDS = DESTINATIONS_ELEVAGE.map((e) => e.id);
export type DESTINATIONS_ELEVAGE_ID = (typeof DESTINATIONS_ELEVAGE_IDS)[number];

export const ORIGINES_NAISSAIN = [
	{
		label: "Par captage en milieu naturel",
		id: "captage",
	},
	{
		label: "Écloserie/nurserie – diploïde",
		id: "ecloserieDiploide",
	},
	{
		label: "Écloserie/nurserie – triploïde",
		id: "ecloserieTriploide",
	},
] as const;
export const ORIGINES_NAISSAIN_IDS = ORIGINES_NAISSAIN.map((e) => e.id);
export type ORIGINES_NAISSAIN_ID = (typeof ORIGINES_NAISSAIN_IDS)[number];

export const DESTINATIONS_NAISSAIN = [
	{
		label: "En France",
		id: "france",
	},
	{
		label: "À l’étranger",
		id: "etranger",
	},
] as const;

export const DESTINATIONS_NAISSAIN_IDS = DESTINATIONS_NAISSAIN.map((e) => e.id);
export type DESTINATIONS_NAISSAIN_ID =
	(typeof DESTINATIONS_NAISSAIN_IDS)[number];
