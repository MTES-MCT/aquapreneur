import { type } from "arktype";

import { IsoDate } from "$lib/types";
import { Percent, PositiveInt, Year } from "$lib/types";

export const LaxNumValue = type(
	"'' | string.numeric.parse | number | null",
).pipe((v) => (v == "" ? null : v));
export type LaxNumValue = typeof LaxNumValue.infer;

// Documentation : https://docs.numerique.gouv.fr/docs/497b674d-abd9-4941-8d72-3e0428b853ee/

export const CGODonneesBilan = type({
	dirigeant_es: type(
		{
			"nom": "string",
			"prenom": "string",
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
		"StckVolHNaisMi?": LaxNumValue, // stock__huitre__nais_mil__qt,
		"StckValHNaisMi?": LaxNumValue, // stock__huitre__nais_mil__val,
		"StckVolHNaisKg?": LaxNumValue, // stock__huitre__nais_kg__qt,
		"StckValHNaisKg?": LaxNumValue, // stock__huitre__nais_kg__val,
		"StckVolHDElv?": LaxNumValue, // stock__huitre__demi_elv__qt,
		"StckValHDElv?": LaxNumValue, // stock__huitre__demi_elv__val,
		"StckVolHElv?": LaxNumValue, // stock__huitre__elv__qt,
		"StckValHElv?": LaxNumValue, // stock__huitre__elv__val,
		"StckVolHConso?": LaxNumValue, // stock__huitre__conso__qt,
		"StckValHConso?": LaxNumValue, // stock__huitre__conso__val,
		"StckVolMNaiss?": LaxNumValue, // stock__moule__nais__qt,
		"StckValMNaiss?": LaxNumValue, // stock__moule__nais__val,
		"StckVolMDElv?": LaxNumValue, // stock__moule__demi_elv__qt,
		"StckValMDElv?": LaxNumValue, // stock__moule__demi_elv__val,
		"StckVolMConso?": LaxNumValue, // stock__moule__conso__qt,
		"StckValMConso?": LaxNumValue, // stock__moule__conso__val,
		"StckVolPNaiss?": LaxNumValue, // stock__palourde__nais__qt,
		"StckValPNaiss?": LaxNumValue, // stock__palourde__nais__val,
		"StckVolPDElv?": LaxNumValue, // stock__palourde__demi_elv__qt,
		"StckValPDElv?": LaxNumValue, // stock__palourde__demi_elv__val,
		"StckVolPConso?": LaxNumValue, // stock__palourde__conso__qt,
		"StckValPConso?": LaxNumValue, // stock__palourde__conso__val,
		"StckVolGLarv?": LaxNumValue, // stock__gambas__larve__qt,
		"StckValGLarv?": LaxNumValue, // stock__gambas__larve__val,
		"StckVolGPreg?": LaxNumValue, // stock__gambas__pregros__qt,
		"StckValGPreg?": LaxNumValue, // stock__gambas__pregros__val,
		"StckVolGConso?": LaxNumValue, // stock__gambas__conso__qt,
		"StckValGConso?": LaxNumValue, // stock__gambas__conso__val,
		"LibPois?": type("string | null"), // stock__poisson__lib,
		"StckVolPois?": LaxNumValue, // stock__poisson__qt,
		"StckValPois?": LaxNumValue, // stock__poisson__val,
		"LibACoq?": type("string | null"), // stock__autre_coq__lib,
		"StckVolACoq?": LaxNumValue, // stock__autre_coq__qt,
		"StckValACoq?": LaxNumValue, // stock__autre_coq__val,
		"LibAPAqua?": type("string | null"), // stock__autre__lib,
		"StckVolAPAqua?": LaxNumValue, // stock__autre__qt,
		"StckValAPAqua?": LaxNumValue, // stock__autre__val,
	},
	production: {
		"VolVtHNaissFr?": LaxNumValue, // prod__huitre__nais__fr__qt,
		"CAHNaissFr?": LaxNumValue, // prod__huitre__nais__fr__val,
		"VolVtHNaissUE?": LaxNumValue, // prod__huitre__nais__ue__qt,
		"CAHNaissUE?": LaxNumValue, // prod__huitre__nais__ue__val,
		"VolVtHNaissAu?": LaxNumValue, // prod__huitre__nais__nue__qt,
		"CAHNaissAu?": LaxNumValue, // prod__huitre__nais__nue__val,
		"VolVtHDElvFr?": LaxNumValue, // prod__huitre__demi_elv__fr__qt,
		"CAHDElvFr?": LaxNumValue, // prod__huitre__demi_elv__fr__val,
		"VolVtHDElvUE?": LaxNumValue, // prod__huitre__demi_elv__ue__qt,
		"CAHDElvUE?": LaxNumValue, // prod__huitre__demi_elv__ue__val,
		"VolVtHDElvAu?": LaxNumValue, // prod__huitre__demi_elv__nue__qt,
		"CAHDElvAU?": LaxNumValue, // prod__huitre__demi_elv__nue__val,
		"VolVtHElvFr?": LaxNumValue, // prod__huitre__elv__fr__qt,
		"CAHElvFr?": LaxNumValue, // prod__huitre__elv__fr__val,
		"VolVtHElvUE?": LaxNumValue, // prod__huitre__elv__ue__qt,
		"CAHElvUE?": LaxNumValue, // prod__huitre__elv__ue__val,
		"VolVtHElvAu?": LaxNumValue, // prod__huitre__elv__nue__qt,
		"CAHElvAu?": LaxNumValue, // prod__huitre__elv__nue__val,
		"VolVtHCoFrPro?": LaxNumValue, // prod__huitre__conso__fr__pro__qt,
		"CAHCoFrPro?": LaxNumValue, // prod__huitre__conso__fr__pro__val,
		"VolVtHCoFrDet?": LaxNumValue, // prod__huitre__conso__fr__detail__qt,
		"CAHCoFrDet?": LaxNumValue, // prod__huitre__conso__fr__detail__val,
		"VolVtHCoFrGros?": LaxNumValue.describe(
			"prod__huitre__conso__fr__grossiste__qt",
		),
		"CAHCoFrGros?": LaxNumValue.describe(
			"prod__huitre__conso__fr__grossiste__val",
		),
		"VolVtHCoFrPCE?": LaxNumValue, // prod__huitre__conso__fr__poiss__qt,
		"CAHCoFrPCE?": LaxNumValue, // prod__huitre__conso__fr__poiss__val,
		"VolVtHCoFrPGMS?": LaxNumValue, // prod__huitre__conso__fr__pgms__qt,
		"CAHCoFrPGMS?": LaxNumValue, // prod__huitre__conso__fr__pgms__val,
		"VolVtHCoFrDeg?": LaxNumValue, // prod__huitre__conso__fr__degust__qt,
		"CAHCoFrDeg?": LaxNumValue, // prod__huitre__conso__fr__degust__val,
		"VolVtHCoUEPro?": LaxNumValue, // prod__huitre__conso__ue__pro__qt,
		"CAHCoUEPro?": LaxNumValue, // prod__huitre__conso__ue__pro__val,
		"VolVtHCoUEGros?": LaxNumValue, // prod__huitre__conso__ue__expe__qt,
		"CAHCoUEGros?": LaxNumValue, // prod__huitre__conso__ue__expe__val,
		"VolVtHCoAuPro?": LaxNumValue, // prod__huitre__conso__nue__pro__qt,
		"CAHCoAuPro?": LaxNumValue, // prod__huitre__conso__nue__pro__val,
		"VolVtHCoAuGros?": LaxNumValue, // prod__huitre__conso__nue__expe__qt,
		"CAHCoAuGros?": LaxNumValue, // prod__huitre__conso__nue__expe__val,
		"VolVtHFrNCat?": LaxNumValue, // prod__huitre__autre__qt,
		"CAHFrNCat?": LaxNumValue, // prod__huitre__autre__val,
		"VolVtMNaissFr?": LaxNumValue, // prod__moule__nais__fr__qt,
		"CAMNaissFr?": LaxNumValue, // prod__moule__nais__fr__val,
		"VolVtMNaissUE?": LaxNumValue, // prod__moule__nais__ue__qt,
		"CAMNaissUE?": LaxNumValue, // prod__moule__nais__ue__val,
		"VolVtMNaissAu?": LaxNumValue, // prod__moule__nais__nue__qt,
		"CAMNaissAu?": LaxNumValue, // prod__moule__nais__nue__val,
		"VolVtMDElvFr?": LaxNumValue, // prod__moule__demi_elv__fr__qt,
		"CAMDElvFr?": LaxNumValue, // prod__moule__demi_elv__fr__val,
		"VolVtMDElvUE?": LaxNumValue, // prod__moule__demi_elv__ue__qt,
		"CAMDElvUE?": LaxNumValue, // prod__moule__demi_elv__ue__val,
		"VolVtMDElvAu?": LaxNumValue, // prod__moule__demi_elv__nue__qt,
		"CAMDElvAU?": LaxNumValue, // prod__moule__demi_elv__nue__val,
		"VolVtMCoFrPro?": LaxNumValue, // prod__moule__conso__fr__pro__qt,
		"CAMCoFrPro?": LaxNumValue, // prod__moule__conso__fr__pro__val,
		"VolVtMCoFrDet?": LaxNumValue, // prod__moule__conso__fr__detail__qt,
		"CAMCoFrDet?": LaxNumValue, // prod__moule__conso__fr__detail__val,
		"VolVtMCoFrGros?": LaxNumValue.describe(
			"prod__moule__conso__fr__grossiste__qt",
		),
		"CAMCoFrGros?": LaxNumValue, // prod__moule__conso__fr__grossiste__val,
		"VolVtMCoFrPCE?": LaxNumValue, // prod__moule__conso__fr__poiss__qt,
		"CAMCoFrPCE?": LaxNumValue, // prod__moule__conso__fr__poiss__val,
		"VolVtMCoFrPGMS?": LaxNumValue, // prod__moule__conso__fr__pgms__qt,
		"CAMCoFrPGMS?": LaxNumValue, // prod__moule__conso__fr__pgms__val,
		"VolVtMCoFrDeg?": LaxNumValue, // prod__moule__conso__fr__degust__qt,
		"CAMCoFrDeg?": LaxNumValue, // prod__moule__conso__fr__degust__val,
		"VolVtMCoUEPro?": LaxNumValue, // prod__moule__conso__ue__pro__qt,
		"CAMCoUEPro?": LaxNumValue, // prod__moule__conso__ue__pro__val,
		"VolVtMCoUEGros?": LaxNumValue, // prod__moule__conso__ue__expe__qt,
		"CAMCoUEGros?": LaxNumValue, // prod__moule__conso__ue__expe__val,
		"VolVtMCoAuPro?": LaxNumValue, // prod__moule__conso__nue__pro__qt,
		"CAMCoAuPro?": LaxNumValue, // prod__moule__conso__nue__pro__val,
		"VolVtMCoAuGros?": LaxNumValue, // prod__moule__conso__nue__expe__qt,
		"CAMCoAuGros?": LaxNumValue, // prod__moule__conso__nue__expe__val,
		"VolVtMFrNCat?": LaxNumValue, // prod__moule__autre__qt,
		"CAMFrNCat?": LaxNumValue, // prod__moule__autre__val,
		"VolVtPNaissFr?": LaxNumValue, // prod__palourde__nais__fr__qt,
		"CAPNaissFr?": LaxNumValue, // prod__palourde__nais__fr__val,
		"VolVtPNaissUE?": LaxNumValue, // prod__palourde__nais__ue__qt,
		"CAPNaissUE?": LaxNumValue, // prod__palourde__nais__ue__val,
		"VolVtPNaissAu?": LaxNumValue, // prod__palourde__nais__nue__qt,
		"CAPNaissAu?": LaxNumValue, // prod__palourde__nais__nue__val,
		"VolVtPDElvFr?": LaxNumValue, // prod__palourde__demi_elv__fr__qt,
		"CAPDElvFr?": LaxNumValue, // prod__palourde__demi_elv__fr__val,
		"VolVtPDElvUE?": LaxNumValue, // prod__palourde__demi_elv__ue__qt,
		"CAPDElvUE?": LaxNumValue, // prod__palourde__demi_elv__ue__val,
		"VolVtPDElvAu?": LaxNumValue, // prod__palourde__demi_elv__nue__qt,
		"CAPDElvAU?": LaxNumValue, // prod__palourde__demi_elv__nue__val,
		"VolVtPCoFrPro?": LaxNumValue, // prod__palourde__conso__fr__pro__qt,
		"CAPCoFrPro?": LaxNumValue, // prod__palourde__conso__fr__pro__val,
		"VolVtPCoFrDet?": LaxNumValue.describe(
			"prod__palourde__conso__fr__detail__qt",
		),
		"CAPCoFrDet?": LaxNumValue, // prod__palourde__conso__fr__detail__val,
		"VolVtPCoFrGros?": LaxNumValue.describe(
			"prod__palourde__conso__fr__grossiste__qt",
		),
		"CAPCoFrGros?": LaxNumValue.describe(
			"prod__palourde__conso__fr__grossiste__val",
		),
		"VolVtPCoFrPCE?": LaxNumValue, // prod__palourde__conso__fr__poiss__qt,
		"CAPCoFrPCE?": LaxNumValue, // prod__palourde__conso__fr__poiss__val,
		"VolVtPCoFrPGMS?": LaxNumValue, // prod__palourde__conso__fr__pgms__qt,
		"CAPCoFrPGMS?": LaxNumValue, // prod__palourde__conso__fr__pgms__val,
		"VolVtPCoFrDeg?": LaxNumValue.describe(
			"prod__palourde__conso__fr__degust__qt",
		),
		"CAPCoFrDeg?": LaxNumValue, // prod__palourde__conso__fr__degust__val,
		"VolVtPCoUEPro?": LaxNumValue, // prod__palourde__conso__ue__pro__qt,
		"CAPCoUEPro?": LaxNumValue, // prod__palourde__conso__ue__pro__val,
		"VolVtPCoUEGros?": LaxNumValue, // prod__palourde__conso__ue__expe__qt,
		"CAPCoUEGros?": LaxNumValue, // prod__palourde__conso__ue__expe__val,
		"VolVtPCoAuPro?": LaxNumValue, // prod__palourde__conso__nue__pro__qt,
		"CAPCoAuPro?": LaxNumValue, // prod__palourde__conso__nue__pro__val,
		"VolVtPCoAuGros?": LaxNumValue.describe(
			"prod__palourde__conso__nue__expe__qt",
		),
		"CAPCoAuGros?": LaxNumValue, // prod__palourde__conso__nue__expe__val,
		"VolVtPFrNCat?": LaxNumValue, // prod__palourde__autre__qt,
		"CAPFrNCat?": LaxNumValue, // prod__palourde__autre__val,
		"VolVtGNaissFr?": LaxNumValue, // prod__gambas__larve__fr__qt,
		"CAGNaissFr?": LaxNumValue, // prod__gambas__larve__fr__val,
		"VolVtGNaissUE?": LaxNumValue, // prod__gambas__larve__ue__qt,
		"CAGNaissUE?": LaxNumValue, // prod__gambas__larve__ue__val,
		"VolVtGNaissAu?": LaxNumValue, // prod__gambas__larve__nue__qt,
		"CAGNaissAu?": LaxNumValue, // prod__gambas__larve__nue__val,
		"VolVtGDElvFr?": LaxNumValue, // prod__gambas__pregros__fr__qt,
		"CAGDElvFr?": LaxNumValue, // prod__gambas__pregros__fr__val,
		"VolVtGDElvUE?": LaxNumValue, // prod__gambas__pregros__ue__qt,
		"CAGDElvUE?": LaxNumValue, // prod__gambas__pregros__ue__val,
		"VolVtGDElvAu?": LaxNumValue, // prod__gambas__pregros__nue__qt,
		"CAGDElvAU?": LaxNumValue, // prod__gambas__pregros__nue__val,
		"VolVtGCoFrPro?": LaxNumValue, // prod__gambas__conso__fr__pro__qt,
		"CAGCoFrPro?": LaxNumValue, // prod__gambas__conso__fr__pro__val,
		"VolVtGCoFrDet?": LaxNumValue, // prod__gambas__conso__fr__detail__qt,
		"CAGCoFrDet?": LaxNumValue, // prod__gambas__conso__fr__detail__val,
		"VolVtGCoFrGros?": LaxNumValue.describe(
			"prod__gambas__conso__fr__grossiste__qt",
		),
		"CAGCoFrGros?": LaxNumValue.describe(
			"prod__gambas__conso__fr__grossiste__val",
		),
		"VolVtGCoFrPCE?": LaxNumValue, // prod__gambas__conso__fr__poiss__qt,
		"CAGCoFrPCE?": LaxNumValue, // prod__gambas__conso__fr__poiss__val,
		"VolVtGCoFrPGMS?": LaxNumValue, // prod__gambas__conso__fr__pgms__qt,
		"CAGCoFrPGMS?": LaxNumValue, // prod__gambas__conso__fr__pgms__val,
		"VolVtGCoFrDeg?": LaxNumValue, // prod__gambas__conso__fr__degust__qt,
		"CAGCoFrDeg?": LaxNumValue, // prod__gambas__conso__fr__degust__val,
		"VolVtGCoUEPro?": LaxNumValue, // prod__gambas__conso__ue__pro__qt,
		"CAGCoUEPro?": LaxNumValue, // prod__gambas__conso__ue__pro__val,
		"VolVtGCoUEGros?": LaxNumValue, // prod__gambas__conso__ue__expe__qt,
		"CAGCoUEGros?": LaxNumValue, // prod__gambas__conso__ue__expe__val,
		"VolVtGCoAuPro?": LaxNumValue, // prod__gambas__conso__nue__pro__qt,
		"CAGCoAuPro?": LaxNumValue, // prod__gambas__conso__nue__pro__val,
		"VolVtGCoAuGros?": LaxNumValue, // prod__gambas__conso__nue__expe__qt,
		"CAGCoAuGros?": LaxNumValue, // prod__gambas__conso__nue__expe__val,
		"VolVtGFrNCat?": LaxNumValue, // prod__gambas__autre__qt,
		"CAGFrNCat?": LaxNumValue, // prod__gambas__autre__val,
		"VolVtPoisFr?": LaxNumValue, // prod__poisson__fr__qt,
		"CAPoisFr?": LaxNumValue, // prod__poisson__fr__val,
		"VolVtACoqFr?": LaxNumValue, // prod__autre_coq__fr__qt,
		"CAACoqFr?": LaxNumValue, // prod__autre_coq__fr__val,
		"VolVtACoqUE?": LaxNumValue, // prod__autre_coq__ue__qt,
		"CAACoqUE?": LaxNumValue, // prod__autre_coq__ue__val,
		"VolVtACoqAu?": LaxNumValue, // prod__autre_coq__nue__qt,
		"CAACoqAu?": LaxNumValue, // prod__autre_coq__nue__val,
		"VolVtAPAquaFr?": LaxNumValue, // prod__autre__fr__qt,
		"CAAPAquaFr?": LaxNumValue, // prod__autre__fr__val,
		"VolVtAPAquaUE?": LaxNumValue, // prod__autre__ue__qt,
		"CAAPAquaUE?": LaxNumValue, // prod__autre__ue__val,
		"VolVtAPAquaAu?": LaxNumValue, // prod__autre__nue__qt,
		"CAAPAquaAu?": LaxNumValue, // prod__autre__nue__val,
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
		"CATot?": LaxNumValue, // eco__revs__total_production_vendue,
		"CAAchRev?": LaxNumValue, // eco__revs__ca_aqua_achat_revente,
		"ArevD?": LaxNumValue, // eco__revs__autres_revenus,
		"Subv?": LaxNumValue, // eco__revs__subvention_exploitation,
		"SubInvest?": LaxNumValue, // eco__revs__subvention_investissement,
		"Salaire?": LaxNumValue, // eco__rh__traitements_salaires_personnels,
		"MOExt?": LaxNumValue, // eco__rh__main_oeuvre_exterieure,
		"CHSocNonSal?": LaxNumValue.describe(
			"eco__rh__charges_sociales_main_oeuvre_non_salariee",
		),
		"NonSal?": LaxNumValue.describe(
			"eco__rh__valeur_imputee_main_oeuvre_non_salariee",
		),
		"Energie?": LaxNumValue, // eco__couts_energetiques,
		"AchHNaiss?": LaxNumValue, // eco__achat__huitre__nais__val,
		"VolAchHNaiss?": LaxNumValue, // eco__achat__huitre__nais__qt,
		"AchHDElv?": LaxNumValue, // eco__achat__huitre__demi_elv__val,
		"VolAchHDElv?": LaxNumValue, // eco__achat__huitre__demi_elv__qt,
		"AchHElv?": LaxNumValue, // eco__achat__huitre__elv__val,
		"VolAchHElv?": LaxNumValue, // eco__achat__huitre__elv__qt,
		"AchHConso?": LaxNumValue, // eco__achat__huitre__conso__val,
		"VolAchHConso?": LaxNumValue, // eco__achat__huitre__conso__qt,
		"AchMNaiss?": LaxNumValue, // eco__achat__moule__nais__val,
		"VolAchMnaiss?": LaxNumValue, // eco__achat__moule__nais__qt,
		"AchMDElv?": LaxNumValue, // eco__achat__moule__demi_elv__val,
		"VolAchMDElv?": LaxNumValue, // eco__achat__moule__demi_elv__qt,
		"AchMConso?": LaxNumValue, // eco__achat__moule__conso__val,
		"VolAchMConso?": LaxNumValue, // eco__achat__moule__conso__qt,
		"AchPNaiss?": LaxNumValue, // eco__achat__palourde__nais__val,
		"VolAchPnaiss?": LaxNumValue, // eco__achat__palourde__nais__qt,
		"AchPDElv?": LaxNumValue, // eco__achat__palourde__demi_elv__val,
		"VolAchPDElv?": LaxNumValue, // eco__achat__palourde__demi_elv__qt,
		"AchPConso?": LaxNumValue, // eco__achat__palourde__conso__val,
		"VolAchPConso?": LaxNumValue, // eco__achat__palourde__conso__qt,
		"AchGNaiss?": LaxNumValue, // eco__achat__gambas__larve__val,
		"VolAchGnaiss?": LaxNumValue, // eco__achat__gambas__larve__qt,
		"AchGDElv?": LaxNumValue, // eco__achat__gambas__pregros__val,
		"VolAchGDElv?": LaxNumValue, // eco__achat__gambas__pregros__qt,
		"AchGConso?": LaxNumValue, // eco__achat__gambas__conso__val,
		"VolAchGConso?": LaxNumValue, // eco__achat__gambas__conso__qt,
		"AchAcoq?": LaxNumValue, // eco__achat__autre_coq__val,
		"VolAchAcoq?": LaxNumValue, // eco__achat__autre_coq__qt,
		"AchAPAqua?": LaxNumValue, // eco__achat__autre__val,
		"VolAchAPAqua?": LaxNumValue, // eco__achat__autre__qt,
		"CtAlim?": LaxNumValue, // eco__achat__aliments,
		"CtOp?": LaxNumValue, // eco__autres_couts_operationnels,
		"Repar?": LaxNumValue, // eco__entretiens_reparations,
		"Amort?": LaxNumValue, // eco__couts_capital__amortissement_capital,
		"CtFi?": LaxNumValue, // eco__couts_capital__charges_financieres,
		"ProdFi?": LaxNumValue, // eco__couts_capital__produits_financiers,
		"Capito?": LaxNumValue, // eco__couts_capital__capitaux_propres,
		"CtExcp?": LaxNumValue, // eco__res_except__charges_except,
		"ProdExcp?": LaxNumValue, // eco__res_except__produits_except,
		"Actif?": LaxNumValue, // eco__valeur_totale_des_actifs,
		"Invest?": LaxNumValue, // eco__invest__total,
		"Acqui_Immo?": LaxNumValue, // eco__invest__acquisition,
		"Cess_Immo?": LaxNumValue, // eco__invest__cession,
		"Dettes?": LaxNumValue, // eco__passif__dettes,
		"Emprunts?": LaxNumValue, // eco__passif__emprunts_dettes_assimil,
		"CACompt?": LaxNumValue, // eco__ca,
		"TotProd?": LaxNumValue, // eco__total_produits,
		"TotCharge?": LaxNumValue, // eco__total_charges,
		"VA?": LaxNumValue, // eco__sig__valeur_ajoutee,
		"EBE?": LaxNumValue, // eco__sig__excedent_brut_exploitation,
		"ResultatCourant?": LaxNumValue, // eco__sig__resultat_courant,
		"ResultatNet?": LaxNumValue, // eco__sig__resultat_net,
	},
});

export const CGORequestData = type({
	"...": CGODonneesBilan,
	"siret": "string", // le code SIRET de l’exploitant, 14 caractères.
	"nom": "string", // le nom de l’exploitation aquacole.
	"debut_exercice": IsoDate, // la date de début d’exercice, au format YYYY-MM-DD.
	"fin_exercice": IsoDate, // la date de fin d’exercice, au format YYYY-MM-DD.
	"version": PositiveInt, // la version du bilan, 1 dans le cas général, itéré en cas de corrections.
	"date_bilan": IsoDate,
});

export type CGOData = typeof CGORequestData.infer;
