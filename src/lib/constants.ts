// https://www.data.gouv.fr/datasets/referentiel-des-pays-et-des-territoires/
import countries_data from "$lib/assets/data/referentiel-pays.json";

// Cookies

export const OIDC_STATE_COOKIE_NAME = "oidc_state";
export const OIDC_ID_TOKEN_COOKIE_NAME = "oidc_id_token";
export const SESSION_COOKIE_NAME = "session_id";
export const ADMIN_CURRENT_SIRET_COOKIE_NAME = "admin_current_siret";
export const DSFR_VERSION = "1.14.0";

// Limitation temporaire à 2024 pour les tests utilisateurs
// export const ANNEES_DECLARATIVES = [2024, 2023, 2022, 2021, 2020] as const;
export const ANNEES_DECLARATIVES = [2024] as const;

export const DECLARATION_TYPES = ["api", "comptable", "producteur"] as const;
export type DeclarationType = (typeof DECLARATION_TYPES)[number];

export const ESPECES = [
	{
		label: "huître creuse",
		id: "huitreCreuse",
		slug: "huitre-creuse",
		scientificName: "Magallana gigas",
	},
	{
		label: "huître plate",
		id: "huitrePlate",
		slug: "huitre-plate",
		scientificName: "Ostrea edulis",
	},
	{
		label: "moule commune",
		id: "mouleCommune",
		slug: "moule-commune",
		scientificName: "Mytilus edulis",
	},
	{
		label: "moule méditerranéenne",
		id: "mouleMediterraneenne",
		slug: "moule-mediterraneenne",
		scientificName: "Mytilus galloprovincialis",
	},
	{
		label: "palourde",
		id: "palourde",
		slug: "palourde",
		scientificName: "",
	},
	{
		label: "coque",
		id: "coque",
		slug: "coque",
		scientificName: "",
	},
] as const;

export const ESPECES_IDS = ESPECES.map((e) => e.id);
export type EspeceId = (typeof ESPECES_IDS)[number];
export const ESPECES_SLUGS = ESPECES.map((e) => e.slug);
export type EspeceSlug = (typeof ESPECES_SLUGS)[number];

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
export type DestinationVenteConsoId =
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
	{
		label: "En gros",
		id: "enGros",
	},
] as const;

export const DESTINATIONS_VENTES_CONSO_FRANCE_IDS =
	DESTINATIONS_VENTES_CONSO_FRANCE.map((e) => e.id);
export type DestinationVenteConsoFranceId =
	(typeof DESTINATIONS_VENTES_CONSO_FRANCE_IDS)[number];

export const STADES_ELEVAGE = [
	{
		label: "Prégrossissement (18 mois)",
		id: "pregrossissement",
	},
	{
		label: "Demi-élevage (24 mois)",
		id: "demiElevage",
	},
	{
		label: "Élevage jusqu’à taille marchande",
		id: "elevageAdulte",
	},
] as const;

export const STADES_ELEVAGE_IDS = STADES_ELEVAGE.map((e) => e.id);
export type StadeElevageId = (typeof STADES_ELEVAGE_IDS)[number];

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
export type DestinationElevageId = (typeof DESTINATIONS_ELEVAGE_IDS)[number];

export const ORIGINES = [
	{
		label: "Captage naturel",
		id: "captage",
	},
	{
		label: "Diploïde d’écloserie",
		id: "ecloserieDiploide",
	},
	{
		label: "Triploïde d’écloserie",
		id: "ecloserieTriploide",
	},
] as const;

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
export type DestinationNaissainId = (typeof DESTINATIONS_NAISSAIN_IDS)[number];

export const ALEAS = [
	{
		label: "Prédation",
		id: "predation",
	},
	{
		label: "Problèmes sanitaires",
		id: "problemesSanitaires",
	},
	{
		label: "Conditions climatiques extrêmes",
		id: "conditionsClimatiques",
	},
	{
		label: "Pollution ou contamination de l’eau",
		id: "pollution",
	},
	{
		label: "Panne ou défaillance d’équipement",
		id: "panne",
	},
] as const;

export const ALEAS_IDS = ALEAS.map((e) => e.id);
export type AleaId = (typeof ALEAS_IDS)[number];

// TODO: pluriel
export const MODE_ELEVAGE = [
	{
		label: "À plat",
		groupe: "decouvrant",
		id: "aPlat",
		especes: null,
	},
	{
		label: "Tables sur estran",
		groupe: "decouvrant",
		id: "tablesEstran",
		especes: null,
	},
	{
		label: "Tables méditerranéennes",
		groupe: "decouvrant",
		id: "tablesMediterraneennes",
		especes: null,
	},
	{
		label: "Pieux (dont bouchots)",
		groupe: "decouvrant",
		id: "pieux",
		especes: ["mouleCommune"],
	},
	{
		label: "Au sol, en cages",
		groupe: "pleineMer",
		id: "auSol",
		especes: null,
	},
	{
		label: "Filière",
		groupe: "pleineMer",
		id: "filiere",
		especes: null,
	},
] as const;

// https://fr.wikipedia.org/wiki/Liste_des_quartiers_d%27immatriculation_des_navires_en_France
// TODO standardiser les clés: id / label
export const QUARTIERS_IMMATRICULATION = [
	{ code: "AC", nom: "Arcachon", localisation: "Atlantique" },
	{ code: "AD", nom: "Audierne", localisation: "Atlantique" },
	{ code: "AY", nom: "Auray", localisation: "Atlantique" },
	{ code: "BA", nom: "Bayonne", localisation: "Atlantique" },
	{ code: "BR", nom: "Brest", localisation: "Atlantique" },
	{ code: "BX", nom: "Bordeaux", localisation: "Atlantique" },
	{ code: "CM", nom: "Camaret", localisation: "Atlantique" },
	{ code: "CC", nom: "Concarneau", localisation: "Atlantique" },
	{ code: "DZ", nom: "Douarnenez", localisation: "Atlantique" },
	{ code: "GV", nom: "Le Guilvinec", localisation: "Atlantique" },
	{ code: "IO", nom: "Île d'Oléron", localisation: "Atlantique" },
	{ code: "YE", nom: "Île d'Yeu", localisation: "Atlantique" },
	{ code: "LR", nom: "La Rochelle", localisation: "Atlantique" },
	{ code: "LS", nom: "Les Sables-d'Olonne", localisation: "Atlantique" },
	{ code: "LO", nom: "Lorient", localisation: "Atlantique" },
	{ code: "MN", nom: "Marennes", localisation: "Atlantique" },
	{ code: "NA", nom: "Nantes", localisation: "Atlantique" },
	{ code: "NO", nom: "Noirmoutier", localisation: "Atlantique" },
	{ code: "SN", nom: "Saint-Nazaire", localisation: "Atlantique" },
	{ code: "VA", nom: "Vannes", localisation: "Atlantique" },

	{ code: "BL", nom: "Boulogne-sur-Mer", localisation: "Manche" },
	{ code: "CN", nom: "Caen", localisation: "Manche" },
	{ code: "CH", nom: "Cherbourg", localisation: "Manche" },
	{ code: "DP", nom: "Dieppe", localisation: "Manche" },
	{ code: "FC", nom: "Fécamp", localisation: "Manche" },
	{ code: "LH", nom: "Le Havre", localisation: "Manche" },
	{ code: "MX", nom: "Morlaix", localisation: "Manche" },
	{ code: "PL", nom: "Paimpol", localisation: "Manche" },
	{ code: "RO", nom: "Rouen", localisation: "Manche" },
	{ code: "SB", nom: "Saint-Brieuc", localisation: "Manche" },
	{ code: "SM", nom: "Saint-Malo", localisation: "Manche" },

	{ code: "DK", nom: "Dunkerque", localisation: "Mer du Nord" },

	{ code: "AJ", nom: "Ajaccio", localisation: "Méditerranée" },
	{ code: "BI", nom: "Bastia", localisation: "Méditerranée" },
	{ code: "MA", nom: "Marseille", localisation: "Méditerranée" },
	{ code: "MT", nom: "Martigues", localisation: "Méditerranée" },
	{ code: "NI", nom: "Nice", localisation: "Méditerranée" },
	{ code: "PV", nom: "Port-Vendres", localisation: "Méditerranée" },
	{ code: "ST", nom: "Sète", localisation: "Méditerranée" },
	{ code: "TL", nom: "Toulon", localisation: "Méditerranée" },

	{ code: "CY", nom: "Cayenne", localisation: "Outre-Mer" },
	{ code: "FF", nom: "Fort-de-France", localisation: "Outre-Mer" },
	{ code: "RU", nom: "La Réunion", localisation: "Outre-Mer" },
	{ code: "PP", nom: "Pointe-à-Pitre", localisation: "Outre-Mer" },
	{ code: "BY", nom: "Saint-Barthélemy ", localisation: "Outre-Mer" },
	{ code: "SP", nom: "Saint-Pierre-et-Miquelon", localisation: "Outre-Mer" },
] as const;

export const QUARTIERS_IMMATRICULATION_IDS = QUARTIERS_IMMATRICULATION.map(
	(e) => e.code,
);
export type QuartierImmatriculationId =
	(typeof QUARTIERS_IMMATRICULATION_IDS)[number];

export const DIPLOMES = [
	{
		id: "aucun",
		label: "Sans diplôme qualifiant",
	},
	{
		id: "cap/bep",
		label: "CAP / BEP",
	},
	{
		id: "bac",
		label: "Bac",
	},
	{
		id: "bac+2",
		label: "Bac +2",
	},
	{
		id: "licence+",
		label: "Licence et plus",
	},
] as const;
export const DIPLOMES_IDS = DIPLOMES.map((e) => e.id);

export const REGIMES_SOCIAUX = [
	{
		id: "general",
		label: "Général",
	},
	{
		id: "enim",
		label: "Enim",
	},
	{
		id: "msa",
		label: "MSA",
	},
] as const;
export const REGIMES_SOCIAUX_IDS = REGIMES_SOCIAUX.map((e) => e.id);

export const COUNTRIES = [
	countries_data.find((c) => c.iso_alpha2 === "FR")!,
	...countries_data.filter((c) => c.iso_alpha2 !== "FR"),
];

export const TYPES_CONTRAT = [
	{
		id: "cdd",
		label: "CDD",
	},
	{
		id: "interim",
		label: "Intérim",
	},
] as const;
export const TYPES_CONTRAT_IDS = TYPES_CONTRAT.map((e) => e.id);

export const TYPES_DUREE_TRAVAIL = [
	{
		id: "tempsPlein",
		label: "Temps plein",
	},
	{
		id: "plusDunMiTemps",
		label: "Plus d’un 1/2 temps",
	},
	{
		id: "miTemps",
		label: "Mi-temps",
	},
	{
		id: "moinsDunMiTemps",
		label: "Moins d’un 1/2 temps",
	},
] as const;
export const TYPES_DUREE_TRAVAILIDS = TYPES_DUREE_TRAVAIL.map((e) => e.id);
