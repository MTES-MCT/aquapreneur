import { type } from "arktype";

import { IsoDate } from "$utils/types";

import { Percent, PositiveInt, Year } from "$lib/types";

const CGOValue = type("'' | string.numeric | number | null").pipe((v) =>
	v == "" ? null : v,
);

export const CGODonneesBilan = type({
	dirigeant_es: type(
		{
			nom: "string",
			prenom: "string",
			"annee_naissance?": Year.or(type.null), // format YYYY.
			"genre?": "'M' | 'F' | 'A' | null", // M, F ou A (autre). Peut être vide en l’absence d’information.
			"annee_entree?": Year.or(type.null), // la date d’entrée dans l’entreprise, au format YYYY.
			"diplome?": "string| null", // diplome le plus élevé
			"diplome_aquacole?": "string| null", // diplome aquacole le plus élevé
			"regime_social?": "string | null",
			"taux_travail?": Percent.or(type.null),
		},
		"[]",
	),
	stock: {
		"StckVolHNaisMi?": CGOValue, // stock__huitre__nais_mil__qt,
		"StckValHNaisMi?": CGOValue, // stock__huitre__nais_mil__val,
		"StckVolHNaisKg?": CGOValue, // stock__huitre__nais_kg__qt,
		"StckValHNaisKg?": CGOValue, // stock__huitre__nais_kg__val,
		"StckVolHDElv?": CGOValue, // stock__huitre__demi_elv__qt,
		"StckValHDElv?": CGOValue, // stock__huitre__demi_elv__val,
		"StckVolHElv?": CGOValue, // stock__huitre__elv__qt,
		"StckValHElv?": CGOValue, // stock__huitre__elv__val,
		"StckVolHConso?": CGOValue, // stock__huitre__conso__qt,
		"StckValHConso?": CGOValue, // stock__huitre__conso__val,
		"StckVolMNaiss?": CGOValue, // stock__moule__nais__qt,
		"StckValMNaiss?": CGOValue, // stock__moule__nais__val,
		"StckVolMDElv?": CGOValue, // stock__moule__demi_elv__qt,
		"StckValMDElv?": CGOValue, // stock__moule__demi_elv__val,
		"StckVolMConso?": CGOValue, // stock__moule__conso__qt,
		"StckValMConso?": CGOValue, // stock__moule__conso__val,
		"StckVolPNaiss?": CGOValue, // stock__palourde__nais__qt,
		"StckValPNaiss?": CGOValue, // stock__palourde__nais__val,
		"StckVolPDElv?": CGOValue, // stock__palourde__demi_elv__qt,
		"StckValPDElv?": CGOValue, // stock__palourde__demi_elv__val,
		"StckVolPConso?": CGOValue, // stock__palourde__conso__qt,
		"StckValPConso?": CGOValue, // stock__palourde__conso__val,
		"StckVolGLarv?": CGOValue, // stock__gambas__larve__qt,
		"StckValGLarv?": CGOValue, // stock__gambas__larve__val,
		"StckVolGPreg?": CGOValue, // stock__gambas__pregros__qt,
		"StckValGPreg?": CGOValue, // stock__gambas__pregros__val,
		"StckVolGConso?": CGOValue, // stock__gambas__conso__qt,
		"StckValGConso?": CGOValue, // stock__gambas__conso__val,
		"LibPois?": type("string | null"), // stock__poisson__lib,
		"StckVolPois?": CGOValue, // stock__poisson__qt,
		"StckValPois?": CGOValue, // stock__poisson__val,
		"LibACoq?": type("string | null"), // stock__autre_coq__lib,
		"StckVolACoq?": CGOValue, // stock__autre_coq__qt,
		"StckValACoq?": CGOValue, // stock__autre_coq__val,
		"LibAPAqua?": type("string | null"), // stock__autre__lib,
		"StckVolAPAqua?": CGOValue, // stock__autre__qt,
		"StckValAPAqua?": CGOValue, // stock__autre__val,
	},
	production: {
		"VolVtHNaissFr?": CGOValue, // prod__huitre__nais__fr__qt,
		"CAHNaissFr?": CGOValue, // prod__huitre__nais__fr__val,
		"VolVtHNaissUE?": CGOValue, // prod__huitre__nais__ue__qt,
		"CAHNaissUE?": CGOValue, // prod__huitre__nais__ue__val,
		"VolVtHNaissAu?": CGOValue, // prod__huitre__nais__nue__qt,
		"CAHNaissAu?": CGOValue, // prod__huitre__nais__nue__val,
		"VolVtHDElvFr?": CGOValue, // prod__huitre__demi_elv__fr__qt,
		"CAHDElvFr?": CGOValue, // prod__huitre__demi_elv__fr__val,
		"VolVtHDElvUE?": CGOValue, // prod__huitre__demi_elv__ue__qt,
		"CAHDElvUE?": CGOValue, // prod__huitre__demi_elv__ue__val,
		"VolVtHDElvAu?": CGOValue, // prod__huitre__demi_elv__nue__qt,
		"CAHDElvAU?": CGOValue, // prod__huitre__demi_elv__nue__val,
		"VolVtHElvFr?": CGOValue, // prod__huitre__elv__fr__qt,
		"CAHElvFr?": CGOValue, // prod__huitre__elv__fr__val,
		"VolVtHElvUE?": CGOValue, // prod__huitre__elv__ue__qt,
		"CAHElvUE?": CGOValue, // prod__huitre__elv__ue__val,
		"VolVtHElvAu?": CGOValue, // prod__huitre__elv__nue__qt,
		"CAHElvAu?": CGOValue, // prod__huitre__elv__nue__val,
		"VolVtHCoFrPro?": CGOValue, // prod__huitre__conso__fr__pro__qt,
		"CAHCoFrPro?": CGOValue, // prod__huitre__conso__fr__pro__val,
		"VolVtHCoFrDet?": CGOValue, // prod__huitre__conso__fr__detail__qt,
		"CAHCoFrDet?": CGOValue, // prod__huitre__conso__fr__detail__val,
		"VolVtHCoFrGros?": CGOValue.describe(
			"prod__huitre__conso__fr__grossiste__qt",
		),
		"CAHCoFrGros?": CGOValue.describe(
			"prod__huitre__conso__fr__grossiste__val",
		),
		"VolVtHCoFrPCE?": CGOValue, // prod__huitre__conso__fr__poiss__qt,
		"CAHCoFrPCE?": CGOValue, // prod__huitre__conso__fr__poiss__val,
		"VolVtHCoFrPGMS?": CGOValue, // prod__huitre__conso__fr__pgms__qt,
		"CAHCoFrPGMS?": CGOValue, // prod__huitre__conso__fr__pgms__val,
		"VolVtHCoFrDeg?": CGOValue, // prod__huitre__conso__fr__degust__qt,
		"CAHCoFrDeg?": CGOValue, // prod__huitre__conso__fr__degust__val,
		"VolVtHCoUEPro?": CGOValue, // prod__huitre__conso__ue__pro__qt,
		"CAHCoUEPro?": CGOValue, // prod__huitre__conso__ue__pro__val,
		"VolVtHCoUEGros?": CGOValue, // prod__huitre__conso__ue__expe__qt,
		"CAHCoUEGros?": CGOValue, // prod__huitre__conso__ue__expe__val,
		"VolVtHCoAuPro?": CGOValue, // prod__huitre__conso__nue__pro__qt,
		"CAHCoAuPro?": CGOValue, // prod__huitre__conso__nue__pro__val,
		"VolVtHCoAuGros?": CGOValue, // prod__huitre__conso__nue__expe__qt,
		"CAHCoAuGros?": CGOValue, // prod__huitre__conso__nue__expe__val,
		"VolVtHFrNCat?": CGOValue, // prod__huitre__autre__qt,
		"CAHFrNCat?": CGOValue, // prod__huitre__autre__val,
		"VolVtMNaissFr?": CGOValue, // prod__moule__nais__fr__qt,
		"CAMNaissFr?": CGOValue, // prod__moule__nais__fr__val,
		"VolVtMNaissUE?": CGOValue, // prod__moule__nais__ue__qt,
		"CAMNaissUE?": CGOValue, // prod__moule__nais__ue__val,
		"VolVtMNaissAu?": CGOValue, // prod__moule__nais__nue__qt,
		"CAMNaissAu?": CGOValue, // prod__moule__nais__nue__val,
		"VolVtMDElvFr?": CGOValue, // prod__moule__demi_elv__fr__qt,
		"CAMDElvFr?": CGOValue, // prod__moule__demi_elv__fr__val,
		"VolVtMDElvUE?": CGOValue, // prod__moule__demi_elv__ue__qt,
		"CAMDElvUE?": CGOValue, // prod__moule__demi_elv__ue__val,
		"VolVtMDElvAu?": CGOValue, // prod__moule__demi_elv__nue__qt,
		"CAMDElvAU?": CGOValue, // prod__moule__demi_elv__nue__val,
		"VolVtMCoFrPro?": CGOValue, // prod__moule__conso__fr__pro__qt,
		"CAMCoFrPro?": CGOValue, // prod__moule__conso__fr__pro__val,
		"VolVtMCoFrDet?": CGOValue, // prod__moule__conso__fr__detail__qt,
		"CAMCoFrDet?": CGOValue, // prod__moule__conso__fr__detail__val,
		"VolVtMCoFrGros?": CGOValue.describe(
			"prod__moule__conso__fr__grossiste__qt",
		),
		"CAMCoFrGros?": CGOValue, // prod__moule__conso__fr__grossiste__val,
		"VolVtMCoFrPCE?": CGOValue, // prod__moule__conso__fr__poiss__qt,
		"CAMCoFrPCE?": CGOValue, // prod__moule__conso__fr__poiss__val,
		"VolVtMCoFrPGMS?": CGOValue, // prod__moule__conso__fr__pgms__qt,
		"CAMCoFrPGMS?": CGOValue, // prod__moule__conso__fr__pgms__val,
		"VolVtMCoFrDeg?": CGOValue, // prod__moule__conso__fr__degust__qt,
		"CAMCoFrDeg?": CGOValue, // prod__moule__conso__fr__degust__val,
		"VolVtMCoUEPro?": CGOValue, // prod__moule__conso__ue__pro__qt,
		"CAMCoUEPro?": CGOValue, // prod__moule__conso__ue__pro__val,
		"VolVtMCoUEGros?": CGOValue, // prod__moule__conso__ue__expe__qt,
		"CAMCoUEGros?": CGOValue, // prod__moule__conso__ue__expe__val,
		"VolVtMCoAuPro?": CGOValue, // prod__moule__conso__nue__pro__qt,
		"CAMCoAuPro?": CGOValue, // prod__moule__conso__nue__pro__val,
		"VolVtMCoAuGros?": CGOValue, // prod__moule__conso__nue__expe__qt,
		"CAMCoAuGros?": CGOValue, // prod__moule__conso__nue__expe__val,
		"VolVtMFrNCat?": CGOValue, // prod__moule__autre__qt,
		"CAMFrNCat?": CGOValue, // prod__moule__autre__val,
		"VolVtPNaissFr?": CGOValue, // prod__palourde__nais__fr__qt,
		"CAPNaissFr?": CGOValue, // prod__palourde__nais__fr__val,
		"VolVtPNaissUE?": CGOValue, // prod__palourde__nais__ue__qt,
		"CAPNaissUE?": CGOValue, // prod__palourde__nais__ue__val,
		"VolVtPNaissAu?": CGOValue, // prod__palourde__nais__nue__qt,
		"CAPNaissAu?": CGOValue, // prod__palourde__nais__nue__val,
		"VolVtPDElvFr?": CGOValue, // prod__palourde__demi_elv__fr__qt,
		"CAPDElvFr?": CGOValue, // prod__palourde__demi_elv__fr__val,
		"VolVtPDElvUE?": CGOValue, // prod__palourde__demi_elv__ue__qt,
		"CAPDElvUE?": CGOValue, // prod__palourde__demi_elv__ue__val,
		"VolVtPDElvAu?": CGOValue, // prod__palourde__demi_elv__nue__qt,
		"CAPDElvAU?": CGOValue, // prod__palourde__demi_elv__nue__val,
		"VolVtPCoFrPro?": CGOValue, // prod__palourde__conso__fr__pro__qt,
		"CAPCoFrPro?": CGOValue, // prod__palourde__conso__fr__pro__val,
		"VolVtPCoFrDet?": CGOValue.describe(
			"prod__palourde__conso__fr__detail__qt",
		),
		"CAPCoFrDet?": CGOValue, // prod__palourde__conso__fr__detail__val,
		"VolVtPCoFrGros?": CGOValue.describe(
			"prod__palourde__conso__fr__grossiste__qt",
		),
		"CAPCoFrGros?": CGOValue.describe(
			"prod__palourde__conso__fr__grossiste__val",
		),
		"VolVtPCoFrPCE?": CGOValue, // prod__palourde__conso__fr__poiss__qt,
		"CAPCoFrPCE?": CGOValue, // prod__palourde__conso__fr__poiss__val,
		"VolVtPCoFrPGMS?": CGOValue, // prod__palourde__conso__fr__pgms__qt,
		"CAPCoFrPGMS?": CGOValue, // prod__palourde__conso__fr__pgms__val,
		"VolVtPCoFrDeg?": CGOValue.describe(
			"prod__palourde__conso__fr__degust__qt",
		),
		"CAPCoFrDeg?": CGOValue, // prod__palourde__conso__fr__degust__val,
		"VolVtPCoUEPro?": CGOValue, // prod__palourde__conso__ue__pro__qt,
		"CAPCoUEPro?": CGOValue, // prod__palourde__conso__ue__pro__val,
		"VolVtPCoUEGros?": CGOValue, // prod__palourde__conso__ue__expe__qt,
		"CAPCoUEGros?": CGOValue, // prod__palourde__conso__ue__expe__val,
		"VolVtPCoAuPro?": CGOValue, // prod__palourde__conso__nue__pro__qt,
		"CAPCoAuPro?": CGOValue, // prod__palourde__conso__nue__pro__val,
		"VolVtPCoAuGros?": CGOValue.describe(
			"prod__palourde__conso__nue__expe__qt",
		),
		"CAPCoAuGros?": CGOValue, // prod__palourde__conso__nue__expe__val,
		"VolVtPFrNCat?": CGOValue, // prod__palourde__autre__qt,
		"CAPFrNCat?": CGOValue, // prod__palourde__autre__val,
		"VolVtGNaissFr?": CGOValue, // prod__gambas__larve__fr__qt,
		"CAGNaissFr?": CGOValue, // prod__gambas__larve__fr__val,
		"VolVtGNaissUE?": CGOValue, // prod__gambas__larve__ue__qt,
		"CAGNaissUE?": CGOValue, // prod__gambas__larve__ue__val,
		"VolVtGNaissAu?": CGOValue, // prod__gambas__larve__nue__qt,
		"CAGNaissAu?": CGOValue, // prod__gambas__larve__nue__val,
		"VolVtGDElvFr?": CGOValue, // prod__gambas__pregros__fr__qt,
		"CAGDElvFr?": CGOValue, // prod__gambas__pregros__fr__val,
		"VolVtGDElvUE?": CGOValue, // prod__gambas__pregros__ue__qt,
		"CAGDElvUE?": CGOValue, // prod__gambas__pregros__ue__val,
		"VolVtGDElvAu?": CGOValue, // prod__gambas__pregros__nue__qt,
		"CAGDElvAU?": CGOValue, // prod__gambas__pregros__nue__val,
		"VolVtGCoFrPro?": CGOValue, // prod__gambas__conso__fr__pro__qt,
		"CAGCoFrPro?": CGOValue, // prod__gambas__conso__fr__pro__val,
		"VolVtGCoFrDet?": CGOValue, // prod__gambas__conso__fr__detail__qt,
		"CAGCoFrDet?": CGOValue, // prod__gambas__conso__fr__detail__val,
		"VolVtGCoFrGros?": CGOValue.describe(
			"prod__gambas__conso__fr__grossiste__qt",
		),
		"CAGCoFrGros?": CGOValue.describe(
			"prod__gambas__conso__fr__grossiste__val",
		),
		"VolVtGCoFrPCE?": CGOValue, // prod__gambas__conso__fr__poiss__qt,
		"CAGCoFrPCE?": CGOValue, // prod__gambas__conso__fr__poiss__val,
		"VolVtGCoFrPGMS?": CGOValue, // prod__gambas__conso__fr__pgms__qt,
		"CAGCoFrPGMS?": CGOValue, // prod__gambas__conso__fr__pgms__val,
		"VolVtGCoFrDeg?": CGOValue, // prod__gambas__conso__fr__degust__qt,
		"CAGCoFrDeg?": CGOValue, // prod__gambas__conso__fr__degust__val,
		"VolVtGCoUEPro?": CGOValue, // prod__gambas__conso__ue__pro__qt,
		"CAGCoUEPro?": CGOValue, // prod__gambas__conso__ue__pro__val,
		"VolVtGCoUEGros?": CGOValue, // prod__gambas__conso__ue__expe__qt,
		"CAGCoUEGros?": CGOValue, // prod__gambas__conso__ue__expe__val,
		"VolVtGCoAuPro?": CGOValue, // prod__gambas__conso__nue__pro__qt,
		"CAGCoAuPro?": CGOValue, // prod__gambas__conso__nue__pro__val,
		"VolVtGCoAuGros?": CGOValue, // prod__gambas__conso__nue__expe__qt,
		"CAGCoAuGros?": CGOValue, // prod__gambas__conso__nue__expe__val,
		"VolVtGFrNCat?": CGOValue, // prod__gambas__autre__qt,
		"CAGFrNCat?": CGOValue, // prod__gambas__autre__val,
		"VolVtPoisFr?": CGOValue, // prod__poisson__fr__qt,
		"CAPoisFr?": CGOValue, // prod__poisson__fr__val,
		"VolVtACoqFr?": CGOValue, // prod__autre_coq__fr__qt,
		"CAACoqFr?": CGOValue, // prod__autre_coq__fr__val,
		"VolVtACoqUE?": CGOValue, // prod__autre_coq__ue__qt,
		"CAACoqUE?": CGOValue, // prod__autre_coq__ue__val,
		"VolVtACoqAu?": CGOValue, // prod__autre_coq__nue__qt,
		"CAACoqAu?": CGOValue, // prod__autre_coq__nue__val,
		"VolVtAPAquaFr?": CGOValue, // prod__autre__fr__qt,
		"CAAPAquaFr?": CGOValue, // prod__autre__fr__val,
		"VolVtAPAquaUE?": CGOValue, // prod__autre__ue__qt,
		"CAAPAquaUE?": CGOValue, // prod__autre__ue__val,
		"VolVtAPAquaAu?": CGOValue, // prod__autre__nue__qt,
		"CAAPAquaAu?": CGOValue, // prod__autre__nue__val,
	},
	destination: {
		"PctCAHNaissFr?": Percent.or(type.null).describe(
			"pct__prod__huitre__nais__fr__val",
		),
		"PctCAHNaissUE?": Percent.or(type.null).describe(
			"pct__prod__huitre__nais__ue__val",
		),
		"PctCAHNaissAu?": Percent.or(type.null).describe(
			"pct__prod__huitre__nais__nue__val",
		),
		"PctCAHDElvFr?": Percent.or(type.null).describe(
			"pct__prod__huitre__demi_elv__fr__val",
		),
		"PctCAHDElvUE?": Percent.or(type.null).describe(
			"pct__prod__huitre__demi_elv__ue__val",
		),
		"PctCAHDElvAu?": Percent.or(type.null).describe(
			"pct__prod__huitre__demi_elv__nue__val",
		),
		"PctCAHElvFr?": Percent.or(type.null).describe(
			"pct__prod__huitre__elv__fr__val",
		),
		"PctCAHElvUE?": Percent.or(type.null).describe(
			"pct__prod__huitre__elv__ue__val",
		),
		"PctCAHElvAu?": Percent.or(type.null).describe(
			"pct__prod__huitre__elv__nue__val",
		),
		"PctCAHCoFrPro?": Percent.or(type.null).describe(
			"pct__prod__huitre__conso__fr__pro__val",
		),
		"PctCAHCoFrDet?": Percent.or(type.null).describe(
			"pct__prod__huitre__conso__fr__detail__val",
		),
		"PctCAHCoFrGros?": Percent.or(type.null).describe(
			"pct__prod__huitre__conso__fr__grossiste__val",
		),
		"PctCAHCoFrPCE?": Percent.or(type.null).describe(
			"pct__prod__huitre__conso__fr__poiss__val",
		),
		"PctCAHCoFrPGMS?": Percent.or(type.null).describe(
			"pct__prod__huitre__conso__fr__pgms__val",
		),
		"PctCAHCoFrDeg?": Percent.or(type.null).describe(
			"pct__prod__huitre__conso__fr__degust__val",
		),
		"PctCAHCoUEPro?": Percent.or(type.null).describe(
			"pct__prod__huitre__conso__ue__pro__val",
		),
		"PctCAHCoUEGros?": Percent.or(type.null).describe(
			"pct__prod__huitre__conso__ue__expe__val",
		),
		"PctCAHCoAuPro?": Percent.or(type.null).describe(
			"pct__prod__huitre__conso__nue__pro__val",
		),
		"PctCAHCoAuGros?": Percent.or(type.null).describe(
			"pct__prod__huitre__conso__nue__expe__val",
		),
		"PctCAMNaissFr?": Percent.or(type.null).describe(
			"pct__prod__moule__nais__fr__val",
		),
		"PctCAMNaissUE?": Percent.or(type.null).describe(
			"pct__prod__moule__nais__ue__val",
		),
		"PctCAMNaissAu?": Percent.or(type.null).describe(
			"pct__prod__moule__nais__nue__val",
		),
		"PctCAMDElvFr?": Percent.or(type.null).describe(
			"pct__prod__moule__demi_elv__fr__val",
		),
		"PctCAMDElvUE?": Percent.or(type.null).describe(
			"pct__prod__moule__demi_elv__ue__val",
		),
		"PctCAMDElvAu?": Percent.or(type.null).describe(
			"pct__prod__moule__demi_elv__nue__val",
		),
		"PctCAMCoFrPro?": Percent.or(type.null).describe(
			"pct__prod__moule__conso__fr__pro__val",
		),
		"PctCAMCoFrDet?": Percent.or(type.null).describe(
			"pct__prod__moule__conso__fr__detail__val",
		),
		"PctCAMCoFrGros?": Percent.or(type.null).describe(
			"pct__prod__moule__conso__fr__grossiste__val",
		),
		"PctCAMCoFrPCE?": Percent.or(type.null).describe(
			"pct__prod__moule__conso__fr__poiss__val",
		),
		"PctCAMCoFrPGMS?": Percent.or(type.null).describe(
			"pct__prod__moule__conso__fr__pgms__val",
		),
		"PctCAMCoFrDeg?": Percent.or(type.null).describe(
			"pct__prod__moule__conso__fr__degust__val",
		),
		"PctCAMCoUEPro?": Percent.or(type.null).describe(
			"pct__prod__moule__conso__ue__pro__val",
		),
		"PctCAMCoUEGros?": Percent.or(type.null).describe(
			"pct__prod__moule__conso__ue__expe__val",
		),
		"PctCAMCoAuPro?": Percent.or(type.null).describe(
			"pct__prod__moule__conso__nue__pro__val",
		),
		"PctCAMCoAuGros?": Percent.or(type.null).describe(
			"pct__prod__moule__conso__nue__expe__val",
		),
		"PctCAPNaissFr?": Percent.or(type.null).describe(
			"pct__prod__palourde__nais__fr__val",
		),
		"PctCAPNaissUE?": Percent.or(type.null).describe(
			"pct__prod__palourde__nais__ue__val",
		),
		"PctCAPNaissAu?": Percent.or(type.null).describe(
			"pct__prod__palourde__nais__nue__val",
		),
		"PctCAPDElvFr?": Percent.or(type.null).describe(
			"pct__prod__palourde__demi_elv__fr__val",
		),
		"PctCAPDElvUE?": Percent.or(type.null).describe(
			"pct__prod__palourde__demi_elv__ue__val",
		),
		"PctCAPDElvAu?": Percent.or(type.null).describe(
			"pct__prod__palourde__demi_elv__nue__val",
		),
		"PctCAPCoFrPro?": Percent.or(type.null).describe(
			"pct__prod__palourde__conso__fr__pro__val",
		),
		"PctCAPCoFrDet?": Percent.or(type.null).describe(
			"pct__prod__palourde__conso__fr__detail__val",
		),
		"PctCAPCoFrGros?": Percent.or(type.null).describe(
			"pct__prod__palourde__conso__fr__grossiste__val",
		),
		"PctCAPCoFrPCE?": Percent.or(type.null).describe(
			"pct__prod__palourde__conso__fr__poiss__val",
		),
		"PctCAPCoFrPGMS?": Percent.or(type.null).describe(
			"pct__prod__palourde__conso__fr__pgms__val",
		),
		"PctCAPCoFrDeg?": Percent.or(type.null).describe(
			"pct__prod__palourde__conso__fr__degust__val",
		),
		"PctCAPCoUEPro?": Percent.or(type.null).describe(
			"pct__prod__palourde__conso__ue__pro__val",
		),
		"PctCAPCoUEGros?": Percent.or(type.null).describe(
			"pct__prod__palourde__conso__ue__expe__val",
		),
		"PctCAPCoAuPro?": Percent.or(type.null).describe(
			"pct__prod__palourde__conso__nue__pro__val",
		),
		"PctCAPCoAuGros?": Percent.or(type.null).describe(
			"pct__prod__palourde__conso__nue__expe__val",
		),
		"PctCAGNaissFr?": Percent.or(type.null).describe(
			"pct__prod__gambas__larve__fr__val",
		),
		"PctCAGNaissUE?": Percent.or(type.null).describe(
			"pct__prod__gambas__larve__ue__val",
		),
		"PctCAGNaissAu?": Percent.or(type.null).describe(
			"pct__prod__gambas__larve__nue__val",
		),
		"PctCAGDElvFr?": Percent.or(type.null).describe(
			"pct__prod__gambas__pregros__fr__val",
		),
		"PctCAGDElvUE?": Percent.or(type.null).describe(
			"pct__prod__gambas__pregros__ue__val",
		),
		"PctCAGDElvAu?": Percent.or(type.null).describe(
			"pct__prod__gambas__pregros__nue__val",
		),
		"PctCAGCoFrPro?": Percent.or(type.null).describe(
			"pct__prod__gambas__conso__fr__pro__val",
		),
		"PctCAGCoFrDet?": Percent.or(type.null).describe(
			"pct__prod__gambas__conso__fr__detail__val",
		),
		"PctCAGCoFrGros?": Percent.or(type.null).describe(
			"pct__prod__gambas__conso__fr__grossiste__val",
		),
		"PctCAGCoFrPCE?": Percent.or(type.null).describe(
			"pct__prod__gambas__conso__fr__poiss__val",
		),
		"PctCAGCoFrPGMS?": Percent.or(type.null).describe(
			"pct__prod__gambas__conso__fr__pgms__val",
		),
		"PctCAGCoFrDeg?": Percent.or(type.null).describe(
			"pct__prod__gambas__conso__fr__degust__val",
		),
		"PctCAGCoUEPro?": Percent.or(type.null).describe(
			"pct__prod__gambas__conso__ue__pro__val",
		),
		"PctCAGCoUEGros?": Percent.or(type.null).describe(
			"pct__prod__gambas__conso__ue__expe__val",
		),
		"PctCAGCoAuPro?": Percent.or(type.null).describe(
			"pct__prod__gambas__conso__nue__pro__val",
		),
		"PctCAGCoAuGros?": Percent.or(type.null).describe(
			"pct__prod__gambas__conso__nue__expe__val",
		),
		"PctCAPoisFr?": Percent.or(type.null).describe(
			"pct__prod__poisson__fr__val",
		),
		"PctCAACoqFr?": Percent.or(type.null).describe(
			"pct__prod__autre_coq__fr__val",
		),
		"PctCAACoqUE?": Percent.or(type.null).describe(
			"pct__prod__autre_coq__ue__val",
		),
		"PctCAACoqAu?": Percent.or(type.null).describe(
			"pct__prod__autre_coq__nue__val",
		),
		"PctCAAPAquaFr?": Percent.or(type.null).describe(
			"pct__prod__autre__fr__val",
		),
		"PctCAAPAquaUE?": Percent.or(type.null).describe(
			"pct__prod__autre__ue__val",
		),
		"PctCAAPAquaAu?": Percent.or(type.null).describe(
			"pct__prod__autre__nue__val",
		),
	},
	donnees_economiques: {
		"CATot?": CGOValue, // eco__revs__total_production_vendue,
		"CAAchRev?": CGOValue, // eco__revs__ca_aqua_achat_revente,
		"ArevD?": CGOValue, // eco__revs__autres_revenus,
		"Subv?": CGOValue, // eco__revs__subvention_exploitation,
		"SubInvest?": CGOValue, // eco__revs__subvention_investissement,
		"Salaire?": CGOValue, // eco__rh__traitements_salaires_personnels,
		"MOExt?": CGOValue, // eco__rh__main_oeuvre_exterieure,
		"CHSocNonSal?": CGOValue.describe(
			"eco__rh__charges_sociales_main_oeuvre_non_salariee",
		),
		"NonSal?": CGOValue.describe(
			"eco__rh__valeur_imputee_main_oeuvre_non_salariee",
		),
		"Energie?": CGOValue, // eco__couts_energetiques,
		"AchHNaiss?": CGOValue, // eco__achat__huitre__nais__val,
		"VolAchHNaiss?": CGOValue, // eco__achat__huitre__nais__qt,
		"AchHDElv?": CGOValue, // eco__achat__huitre__demi_elv__val,
		"VolAchHDElv?": CGOValue, // eco__achat__huitre__demi_elv__qt,
		"AchHElv?": CGOValue, // eco__achat__huitre__elv__val,
		"VolAchHElv?": CGOValue, // eco__achat__huitre__elv__qt,
		"AchHConso?": CGOValue, // eco__achat__huitre__conso__val,
		"VolAchHConso?": CGOValue, // eco__achat__huitre__conso__qt,
		"AchMNaiss?": CGOValue, // eco__achat__moule__nais__val,
		"VolAchMnaiss?": CGOValue, // eco__achat__moule__nais__qt,
		"AchMDElv?": CGOValue, // eco__achat__moule__demi_elv__val,
		"VolAchMDElv?": CGOValue, // eco__achat__moule__demi_elv__qt,
		"AchMConso?": CGOValue, // eco__achat__moule__conso__val,
		"VolAchMConso?": CGOValue, // eco__achat__moule__conso__qt,
		"AchPNaiss?": CGOValue, // eco__achat__palourde__nais__val,
		"VolAchPnaiss?": CGOValue, // eco__achat__palourde__nais__qt,
		"AchPDElv?": CGOValue, // eco__achat__palourde__demi_elv__val,
		"VolAchPDElv?": CGOValue, // eco__achat__palourde__demi_elv__qt,
		"AchPConso?": CGOValue, // eco__achat__palourde__conso__val,
		"VolAchPConso?": CGOValue, // eco__achat__palourde__conso__qt,
		"AchGNaiss?": CGOValue, // eco__achat__gambas__larve__val,
		"VolAchGnaiss?": CGOValue, // eco__achat__gambas__larve__qt,
		"AchGDElv?": CGOValue, // eco__achat__gambas__pregros__val,
		"VolAchGDElv?": CGOValue, // eco__achat__gambas__pregros__qt,
		"AchGConso?": CGOValue, // eco__achat__gambas__conso__val,
		"VolAchGConso?": CGOValue, // eco__achat__gambas__conso__qt,
		"AchAcoq?": CGOValue, // eco__achat__autre_coq__val,
		"VolAchAcoq?": CGOValue, // eco__achat__autre_coq__qt,
		"AchAPAqua?": CGOValue, // eco__achat__autre__val,
		"VolAchAPAqua?": CGOValue, // eco__achat__autre__qt,
		"CtAlim?": CGOValue, // eco__achat__aliments,
		"CtOp?": CGOValue, // eco__autres_couts_operationnels,
		"Repar?": CGOValue, // eco__entretiens_reparations,
		"Amort?": CGOValue, // eco__couts_capital__amortissement_capital,
		"CtFi?": CGOValue, // eco__couts_capital__charges_financieres,
		"ProdFi?": CGOValue, // eco__couts_capital__produits_financiers,
		"Capito?": CGOValue, // eco__couts_capital__capitaux_propres,
		"CtExcp?": CGOValue, // eco__res_except__charges_except,
		"ProdExcp?": CGOValue, // eco__res_except__produits_except,
		"Actif?": CGOValue, // eco__valeur_totale_des_actifs,
		"Invest?": CGOValue, // eco__invest__total,
		"Acqui_Immo?": CGOValue, // eco__invest__acquisition,
		"Cess_Immo?": CGOValue, // eco__invest__cession,
		"Dettes?": CGOValue, // eco__passif__dettes,
		"Emprunts?": CGOValue, // eco__passif__emprunts_dettes_assimil,
		"CACompt?": CGOValue, // eco__ca,
		"TotProd?": CGOValue, // eco__total_produits,
		"TotCharge?": CGOValue, // eco__total_charges,
		"VA?": CGOValue, // eco__sig__valeur_ajoutee,
		"EBE?": CGOValue, // eco__sig__excedent_brut_exploitation,
		"ResultatCourant?": CGOValue, // eco__sig__resultat_courant,
		"ResultatNet?": CGOValue, // eco__sig__resultat_net,
	},
});

export const CGORequestData = type({
	"...": CGODonneesBilan,
	siret: "string", // le code SIRET de l’exploitant, 14 caractères.
	nom: "string", // le nom de l’exploitation aquacole.
	debut_exercice: IsoDate, // la date de début d’exercice, au format YYYY-MM-DD.
	fin_exercice: IsoDate, // la date de fin d’exercice, au format YYYY-MM-DD.
	version: PositiveInt, // la version du bilan, 1 dans le cas général, itéré en cas de corrections.
	date_bilan: IsoDate,
});

export type CGOData = typeof CGORequestData.infer;
