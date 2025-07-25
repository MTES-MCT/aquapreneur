import { Column, desc, eq } from "drizzle-orm";
import cloneDeep from "lodash/cloneDeep";
import { beforeAll, describe, expect, inject, test } from "vitest";

import { db } from "$lib/server/db";
import { bilans, evtsJournalReqs, jetonsApi } from "$lib/server/db/schema/api";
import {
	entreprises,
	etablissementsTable,
} from "$lib/server/db/schema/entreprise";
import { getJetonApiFromToken } from "$lib/server/db/utils";
import { generateApiToken } from "$lib/server/utils";

import { CGODonneesBilan } from "$lib/schemas/cgo-schema";

import type { AnyPgTable } from "drizzle-orm/pg-core";

let validAuthToken: string;

async function getLastById<T extends AnyPgTable>(table: T) {
	if ("id" in table) {
		const id = table.id as Column;
		//@ts-expect-error TODO: corriger le type de `table`
		return (await db.select().from(table).orderBy(desc(id)).limit(1))[0];
	} else {
		throw Error("This table doesn’t have an `id` field");
	}
}

const dummySiret1 = "13002526500013";
const dummySiret2 = "13003001800019";
const dummySiret3 = "13001261000031";
const dummyBilan = {
	siret: dummySiret1,
	nom: "producteur",
	debut_exercice: "2020-01-01",
	fin_exercice: "2020-12-31",
	version: 1,
	date_bilan: "2021-05-01",
	dirigeant_es: [
		{
			nom: "nom",
			prenom: "prenom",
		},
	],
	stock: {},
	production: {},
	donnees_economiques: {},
	destination: {},
};

const baseUrl = inject("baseUrl");

beforeAll(async () => {
	// Génération d’un token d’authentification
	const { token, digest } = generateApiToken();
	validAuthToken = token;
	const values = {
		hachage: digest,
		nomPartenaire: "partenaire test",
		siretPartenaire: dummySiret3,
		courrielPartenaire: "test@test.com",
	};
	await db.insert(jetonsApi).values(values);
});

const post = (
	relativeUrl: string,
	{ data, headers = {} }: { data?: object; headers?: object },
) => {
	return fetch(`${baseUrl}${relativeUrl}`, {
		method: "POST",
		headers: { "content-type": "application/json", ...headers },
		body: data ? JSON.stringify(data) : null,
	});
};

describe("Tests de création entreprise et établissement", async () => {
	// On utilise un SIRET à part pour ces test pour éviter que les entreprises
	// aient été créées par ailleur
	const siret = "33071536800032";

	test("L’entreprise n’existe pas a priori", async () => {
		const result = await db
			.select()
			.from(entreprises)
			.where(eq(entreprises.siren, siret.slice(0, 9)));
		expect(result.length).toBe(0);
	});

	test("L’établissement n’existe pas a priori", async () => {
		const result = await db
			.select()
			.from(etablissementsTable)
			.where(eq(etablissementsTable.siret, siret));
		expect(result.length).toBe(0);
	});

	test("Une requête API créé établissement et entreprise", async () => {
		await post(`/api/v0/bilan/cgo/${siret}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: {
				...dummyBilan,
				siret,
			},
		});

		const result1 = await db
			.select()
			.from(entreprises)
			.where(eq(entreprises.siren, siret.slice(0, 9)));
		expect(result1.length).toBe(1);
		expect(result1[0].siren).toBe(siret.slice(0, 9));

		const result2 = await db
			.select()
			.from(etablissementsTable)
			.where(eq(etablissementsTable.siret, siret));
		expect(result2.length).toBe(1);
		expect(result2[0].siret).toBe(siret);
	});
});

describe("Tests d’autorisation", async () => {
	test("401 pour les requêtes non authentifiées", async () => {
		const response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			data: dummyBilan,
		});
		expect(response.status).toBe(401);
		expect((await response.json()).message).toBe(
			"En-tête `Authorization` absent",
		);
	});

	test("401 pour les jetons inexistants", async () => {
		const response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer XXX` },
			data: dummyBilan,
		});
		expect(response.status).toBe(401);
		expect((await response.json()).message).toBe(
			"Jeton d’authentification invalide",
		);
	});

	test("401 pour les jetons desactivés", async () => {
		const { token, digest } = generateApiToken();
		const disabledAuthToken = token;
		const values = {
			hachage: digest,
			nomPartenaire: "partenaire test",
			siretPartenaire: dummySiret3,
			courrielPartenaire: "test@test.com",
			valide: false,
		};
		await db.insert(jetonsApi).values(values);

		const response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${disabledAuthToken}` },
			data: dummyBilan,
		});
		expect(response.status).toBe(401);
		expect((await response.json()).message).toBe(
			"Jeton d’authentification désactivé",
		);
	});

	test("400 pour les en-têtes d’autorisation mal formés", async () => {
		let response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `XXX` },
			data: dummyBilan,
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			"En-tête `Authorization` incorrect. La valeur attendue est : `Bearer <YOUR TOKEN>`",
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer` },
			data: dummyBilan,
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			"En-tête `Authorization` incorrect. La valeur attendue est : `Bearer <YOUR TOKEN>`",
		);
	});

	test("204 en cas de succès", async () => {
		const response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: dummyBilan,
		});
		expect(response.status).toBe(204);
	});
});

describe("Tests de sauvegarde du journal de requêtes", async () => {
	test("Une entrée est ajoutée au journal de requêtes", async () => {
		const response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: dummyBilan,
		});
		expect(response.status).toBe(204);

		const inserted = await getLastById(evtsJournalReqs);
		const jeton = await getJetonApiFromToken(validAuthToken);
		expect(jeton).not.toBeNull();
		expect(jeton!.valide).toBe(true);

		expect(inserted.idJeton).toBe(jeton!.id);
		expect(inserted.versionApi).toBe(0);
		expect(inserted.pathname).toBe(`/api/v0/bilan/cgo/${dummySiret1}`);
		expect(inserted.href).toBe(response.url);
		expect(inserted.methode).toBe("POST");
		expect(inserted.donnees).toEqual(dummyBilan);
		expect(inserted.statut).toBe(204);
		expect(Date.now() - inserted.dateCreation.getTime()).toBeGreaterThan(0);
		expect(Date.now() - inserted.dateCreation.getTime()).toBeLessThan(100);
	});

	test("Une entrée est ajoutée au journal de requêtes, même si la requête échoue", async () => {
		const response = await post(`/api/v0/bilan/cgo/123`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, siret: "123" },
		});
		expect(response.status).toBe(400);

		const inserted = await getLastById(evtsJournalReqs);
		const jeton = await getJetonApiFromToken(validAuthToken);
		expect(jeton).not.toBeNull();
		expect(jeton!.valide).toBe(true);

		expect(inserted.idJeton).toBe(jeton!.id);
		expect(inserted.versionApi).toBe(0);
		expect(inserted.pathname).toBe(`/api/v0/bilan/cgo/123`);
		expect(inserted.href).toBe(response.url);
		expect(inserted.methode).toBe("POST");
		expect(inserted.donnees).toEqual({ ...dummyBilan, siret: "123" });
		expect(inserted.statut).toBe(400);
		expect(Date.now() - inserted.dateCreation.getTime()).toBeGreaterThan(0);
		expect(Date.now() - inserted.dateCreation.getTime()).toBeLessThan(100);
	});
});

describe("Tests de validation du SIRET", async () => {
	test("400 si le siret de l’URL est invalide", async () => {
		let response;
		const invalidSiretTooShort = "123";
		const invalidSiretNotNumeric = "ABC12345678904";

		response = await post(`/api/v0/bilan/cgo/${invalidSiretTooShort}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, invalidSiretTooShort },
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			"Code SIRET de l’URL incorrect",
		);

		response = await post(`/api/v0/bilan/cgo/${invalidSiretNotNumeric}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, invalidSiretNotNumeric },
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			"Code SIRET de l’URL incorrect",
		);
	});

	test("400 si les sirets ne sont pas consistents", async () => {
		let response;
		const siret1 = dummySiret1;
		const siret2 = dummySiret2;

		response = await post(`/api/v0/bilan/cgo/${siret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, siret: siret1 },
		});

		expect(response.status).toBe(204);

		response = await post(`/api/v0/bilan/cgo/${siret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, siret: siret2 },
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe("Numéros SIRET inconsistents");
	});

	test("400 en l’absence de JSON dans la requête", async () => {
		const response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
		});
		expect(response.status).toBe(400);
	});

	test("Vérification du siret", async () => {
		let siret = "12345678";
		let response = await post(`/api/v0/bilan/cgo/${siret}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: {
				...dummyBilan,
				siret,
			},
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			"Code SIRET de l’URL incorrect",
		);

		siret = "abcdefghijklmn";
		expect(siret.length === 14);
		response = await post(`/api/v0/bilan/cgo/${siret}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: {
				...dummyBilan,
				siret,
			},
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			"Code SIRET de l’URL incorrect",
		);

		siret = "12345678901234";
		response = await post(`/api/v0/bilan/cgo/${siret}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: {
				...dummyBilan,
				siret,
			},
		});

		expect(response.status).toBe(404);
		expect((await response.json()).message).toBe("Numéro SIRET inexistant");

		siret = dummySiret1;
		response = await post(`/api/v0/bilan/cgo/${siret}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: {
				...dummyBilan,
				siret,
			},
		});
		expect(response.status).toBe(204);
	});
});

describe("Tests de validation du SIRET", async () => {
	test("204 si un champ monétaire est manquant", async () => {
		let response;
		let inserted;

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, stock: {} },
		});
		expect(response.status).toBe(204);
		inserted = CGODonneesBilan.assert((await getLastById(bilans)).donnees);
		expect(inserted.stock.StckValHNaisMi).toBeUndefined();

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, stock: { StckValHNaisMi: null } },
		});
		expect(response.status).toBe(204);
		inserted = CGODonneesBilan.assert((await getLastById(bilans)).donnees);
		expect(inserted.stock.StckValHNaisMi).toBeNull();

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, stock: { StckValHNaisMi: undefined } },
		});
		expect(response.status).toBe(204);
		inserted = CGODonneesBilan.assert((await getLastById(bilans)).donnees);
		expect(inserted.stock.StckValHNaisMi).toBeUndefined();

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, stock: { StckValHNaisMi: "" } },
		});
		expect(response.status).toBe(204);
		inserted = CGODonneesBilan.assert((await getLastById(bilans)).donnees);
		expect(inserted.stock.StckValHNaisMi).toBeNull();
	});

	test("204 si un champ monétaire est une chaine où un nombre", async () => {
		let response;
		let inserted;

		// On autorise à la fois les chaine de caractère et les nombres

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: {
				...dummyBilan,
				stock: { StckValHNaisMi: "12345.67" },
			},
		});
		expect(response.status).toBe(204);
		inserted = CGODonneesBilan.assert((await getLastById(bilans)).donnees);
		expect(inserted.stock.StckValHNaisMi).toBe(12345.67);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, stock: { StckValHNaisMi: 12345.67 } },
		});
		expect(response.status).toBe(204);
		inserted = CGODonneesBilan.assert((await getLastById(bilans)).donnees);
		expect(inserted.stock.StckValHNaisMi).toBe(12345.67);
	});

	test("400 si un champ monétaire est invalide", async () => {
		const response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, stock: { StckValHNaisMi: "ABC" } },
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			'stock.StckValHNaisMi must be a number, "", null, a well-formed numeric string or undefined (was "ABC")',
		);
	});
});

describe("Tests de validation des champs dirigeant_es", async () => {
	test("400 si le champ dirigeant_es n’est pas un tableau", async () => {
		const { dirigeant_es, ...dummyBilanNoDir } = dummyBilan;
		let response;

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: dummyBilanNoDir,
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			"dirigeant_es must be an array (was missing)",
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilanNoDir, dirigeant_es: "notAnArray" },
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			"dirigeant_es must be an array (was string)",
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilanNoDir, dirigeant_es: [] },
		});
		expect(response.status).toBe(204);
	});

	test("400 si le champ dirigeant_es est incorrect", async () => {
		const { dirigeant_es, ...dummyBilanNoDir } = dummyBilan;
		let response;

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: {
				...dummyBilanNoDir,
				dirigeant_es: [{}],
			},
		});
		expect(response.status).toBe(400);
		const body = await response.json();
		expect(body.message).toContain("prenom must be a string (was missing)");
		expect(body.message).toContain("nom must be a string (was missing)");

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: {
				...dummyBilanNoDir,
				dirigeant_es: [
					{
						nom: "Nom",
					},
				],
			},
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			"dirigeant_es[0].prenom must be a string (was missing)",
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: {
				...dummyBilanNoDir,
				dirigeant_es: [
					{
						nom: 123,
						prenom: "Prenom",
					},
				],
			},
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			"dirigeant_es[0].nom must be a string (was a number)",
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: {
				...dummyBilanNoDir,
				dirigeant_es: [
					{
						nom: "Nom",
						prenom: "Prenom",
						annee_naissance: "abc",
					},
				],
			},
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			'dirigeant_es[0].annee_naissance must be a number, undefined or null (was "abc")',
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: {
				...dummyBilanNoDir,
				dirigeant_es: [
					{
						nom: "Nom",
						prenom: "Prenom",
						annee_naissance: "abc",
					},
				],
			},
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			'dirigeant_es[0].annee_naissance must be a number, undefined or null (was "abc")',
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: {
				...dummyBilanNoDir,
				dirigeant_es: [
					{
						nom: "Nom",
						prenom: "Prenom",
						anneeN: "abc",
					},
				],
			},
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			"dirigeant_es[0].anneeN must be removed",
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: {
				...dummyBilanNoDir,
				dirigeant_es: [
					{
						nom: "Nom",
						prenom: "Prenom",
						annee_naissance: 2000,
					},
				],
			},
		});
		expect(response.status).toBe(204);
	});
});
describe("Tests de validation des champs date", async () => {
	test("400 si un champ date n’est pas au bon format", async () => {
		let response;

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, debut_exercice: "" },
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			'debut_exercice must be a valid date (invalid RFC 9557 string: ) (was "")',
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, debut_exercice: null },
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			"debut_exercice must be a string (was null)",
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, debut_exercice: undefined },
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			"debut_exercice must be a string (was missing)",
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, debut_exercice: "12/31/2020" },
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			'debut_exercice must be a valid date (invalid RFC 9557 string: 12/31/2020) (was "12/31/2020")',
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, debut_exercice: "31/12/2020" },
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			'debut_exercice must be a valid date (invalid RFC 9557 string: 31/12/2020) (was "31/12/2020")',
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, debut_exercice: "2020-31-12" },
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe(
			'debut_exercice must be a valid date (invalid RFC 9557 string: 2020-31-12) (was "2020-31-12")',
		);

		response = await post(`/api/v0/bilan/cgo/${dummySiret1}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: { ...dummyBilan, debut_exercice: "2020-12-31" },
		});
		expect(response.status).toBe(204);
	});
});

describe("Tests de conversion des champs CGO", async () => {
	const testBilanCGO = {
		siret: dummySiret1,
		nom: "NOM_ANONYME",
		debut_exercice: "2024-01-01",
		fin_exercice: "2024-12-31",
		version: 1,
		date_bilan: "2025-03-13",
		dirigeant_es: [
			{
				nom: "NOM_DIRIGEANT1",
				prenom: "PRENOM_DIRIGEANT1",
				annee_naissance: 1965,
				genre: "M",
				annee_entree: 1998,
				diplome: null,
				diplome_aquacole: null,
				regime_social: null,
				taux_travail: null,
			},
			{
				nom: "NOM_DIRIGEANT2",
				prenom: "PRENOM_DIRIGEANT2",
				annee_naissance: 1968,
				genre: "F",
				annee_entree: 2022,
				diplome: null,
				diplome_aquacole: null,
				regime_social: null,
				taux_travail: null,
			},
		],
		stock: {
			StckVolHNaisMi: 5000,
			StckValHNaisMi: 20000,
			StckVolHNaisKg: null,
			StckValHNaisKg: null,
			StckVolHDElv: 27075,
			StckValHDElv: 40612.5,
			StckVolHElv: 68040,
			StckValHElv: 122472,
			StckVolHConso: 20800,
			StckValHConso: 37440,
			StckVolMNaiss: null,
			StckValMNaiss: null,
			StckVolMDElv: null,
			StckValMDElv: null,
			StckVolMConso: null,
			StckValMConso: null,
			StckVolPNaiss: null,
			StckValPNaiss: null,
			StckVolPDElv: null,
			StckValPDElv: null,
			StckVolPConso: null,
			StckValPConso: null,
			StckVolGLarv: null,
			StckValGLarv: null,
			StckVolGPreg: null,
			StckValGPreg: null,
			StckVolGConso: null,
			StckValGConso: null,
			LibPois: null,
			StckVolPois: null,
			StckValPois: null,
			LibACoq: null,
			StckVolACoq: 0,
			StckValACoq: 0,
			LibAPAqua: null,
			StckVolAPAqua: null,
			StckValAPAqua: null,
		},
		production: {
			VolVtHNaissFr: null,
			CAHNaissFr: null,
			VolVtHNaissUE: null,
			CAHNaissUE: null,
			VolVtHNaissAu: null,
			CAHNaissAu: null,
			VolVtHDElvFr: null,
			CAHDElvFr: null,
			VolVtHDElvUE: null,
			CAHDElvUE: null,
			VolVtHDElvAu: null,
			CAHDElvAU: null,
			VolVtHElvFr: null,
			CAHElvFr: 57114,
			VolVtHElvUE: null,
			CAHElvUE: null,
			VolVtHElvAu: null,
			CAHElvAu: null,
			VolVtHCoFrPro: 160,
			CAHCoFrPro: 477095.07,
			VolVtHCoFrDet: null,
			CAHCoFrDet: null,
			VolVtHCoFrGros: null,
			CAHCoFrGros: null,
			VolVtHCoFrPCE: null,
			CAHCoFrPCE: null,
			VolVtHCoFrPGMS: null,
			CAHCoFrPGMS: null,
			VolVtHCoFrDeg: null,
			CAHCoFrDeg: 4879.55,
			VolVtHCoUEPro: null,
			CAHCoUEPro: null,
			VolVtHCoUEGros: null,
			CAHCoUEGros: null,
			VolVtHCoAuPro: null,
			CAHCoAuPro: null,
			VolVtHCoAuGros: null,
			CAHCoAuGros: null,
			VolVtHFrNCat: null,
			CAHFrNCat: null,
			VolVtMNaissFr: null,
			CAMNaissFr: null,
			VolVtMNaissUE: null,
			CAMNaissUE: null,
			VolVtMNaissAu: null,
			CAMNaissAu: null,
			VolVtMDElvFr: null,
			CAMDElvFr: null,
			VolVtMDElvUE: null,
			CAMDElvUE: null,
			VolVtMDElvAu: null,
			CAMDElvAU: null,
			VolVtMCoFrPro: null,
			CAMCoFrPro: 199.91,
			VolVtMCoFrDet: null,
			CAMCoFrDet: null,
			VolVtMCoFrGros: null,
			CAMCoFrGros: null,
			VolVtMCoFrPCE: null,
			CAMCoFrPCE: null,
			VolVtMCoFrPGMS: null,
			CAMCoFrPGMS: null,
			VolVtMCoFrDeg: null,
			CAMCoFrDeg: 6002.3,
			VolVtMCoUEPro: null,
			CAMCoUEPro: null,
			VolVtMCoUEGros: null,
			CAMCoUEGros: null,
			VolVtMCoAuPro: null,
			CAMCoAuPro: null,
			VolVtMCoAuGros: null,
			CAMCoAuGros: null,
			VolVtMFrNCat: null,
			CAMFrNCat: null,
			VolVtPNaissFr: null,
			CAPNaissFr: null,
			VolVtPNaissUE: null,
			CAPNaissUE: null,
			VolVtPNaissAu: null,
			CAPNaissAu: null,
			VolVtPDElvFr: null,
			CAPDElvFr: null,
			VolVtPDElvUE: null,
			CAPDElvUE: null,
			VolVtPDElvAu: null,
			CAPDElvAU: null,
			VolVtPCoFrPro: null,
			CAPCoFrPro: null,
			VolVtPCoFrDet: null,
			CAPCoFrDet: null,
			VolVtPCoFrGros: null,
			CAPCoFrGros: null,
			VolVtPCoFrPCE: null,
			CAPCoFrPCE: null,
			VolVtPCoFrPGMS: null,
			CAPCoFrPGMS: null,
			VolVtPCoFrDeg: null,
			CAPCoFrDeg: null,
			VolVtPCoUEPro: null,
			CAPCoUEPro: null,
			VolVtPCoUEGros: null,
			CAPCoUEGros: null,
			VolVtPCoAuPro: null,
			CAPCoAuPro: null,
			VolVtPCoAuGros: null,
			CAPCoAuGros: null,
			VolVtPFrNCat: null,
			CAPFrNCat: null,
			VolVtGNaissFr: null,
			CAGNaissFr: null,
			VolVtGNaissUE: null,
			CAGNaissUE: null,
			VolVtGNaissAu: null,
			CAGNaissAu: null,
			VolVtGDElvFr: null,
			CAGDElvFr: null,
			VolVtGDElvUE: null,
			CAGDElvUE: null,
			VolVtGDElvAu: null,
			CAGDElvAU: null,
			VolVtGCoFrPro: null,
			CAGCoFrPro: null,
			VolVtGCoFrDet: null,
			CAGCoFrDet: null,
			VolVtGCoFrGros: null,
			CAGCoFrGros: null,
			VolVtGCoFrPCE: null,
			CAGCoFrPCE: null,
			VolVtGCoFrPGMS: null,
			CAGCoFrPGMS: null,
			VolVtGCoFrDeg: null,
			CAGCoFrDeg: null,
			VolVtGCoUEPro: null,
			CAGCoUEPro: null,
			VolVtGCoUEGros: null,
			CAGCoUEGros: null,
			VolVtGCoAuPro: null,
			CAGCoAuPro: null,
			VolVtGCoAuGros: null,
			CAGCoAuGros: null,
			VolVtGFrNCat: null,
			CAGFrNCat: null,
			VolVtPoisFr: null,
			CAPoisFr: null,
			VolVtACoqFr: null,
			CAACoqFr: null,
			VolVtACoqUE: null,
			CAACoqUE: null,
			VolVtACoqAu: null,
			CAACoqAu: null,
			VolVtAPAquaFr: null,
			CAAPAquaFr: null,
			VolVtAPAquaUE: null,
			CAAPAquaUE: null,
			VolVtAPAquaAu: null,
			CAAPAquaAu: null,
		},
		destination: {
			PctCAHNaissFr: null,
			PctCAHNaissUE: null,
			PctCAHNaissAu: null,
			PctCAHDElvFr: null,
			PctCAHDElvUE: null,
			PctCAHDElvAu: null,
			PctCAHElvFr: 0.1,
			PctCAHElvUE: null,
			PctCAHElvAu: null,
			PctCAHCoFrPro: 0.87,
			PctCAHCoFrDet: null,
			PctCAHCoFrGros: null,
			PctCAHCoFrPCE: null,
			PctCAHCoFrPGMS: null,
			PctCAHCoFrDeg: 0.01,
			PctCAHCoUEPro: null,
			PctCAHCoUEGros: null,
			PctCAHCoAuPro: null,
			PctCAHCoAuGros: null,
			PctCAMNaissFr: null,
			PctCAMNaissUE: null,
			PctCAMNaissAu: null,
			PctCAMDElvFr: null,
			PctCAMDElvUE: null,
			PctCAMDElvAu: null,
			PctCAMCoFrPro: null,
			PctCAMCoFrDet: null,
			PctCAMCoFrGros: null,
			PctCAMCoFrPCE: null,
			PctCAMCoFrPGMS: null,
			PctCAMCoFrDeg: 0.01,
			PctCAMCoUEPro: null,
			PctCAMCoUEGros: null,
			PctCAMCoAuPro: null,
			PctCAMCoAuGros: null,
			PctCAPNaissFr: null,
			PctCAPNaissUE: null,
			PctCAPNaissAu: null,
			PctCAPDElvFr: null,
			PctCAPDElvUE: null,
			PctCAPDElvAu: null,
			PctCAPCoFrPro: null,
			PctCAPCoFrDet: null,
			PctCAPCoFrGros: null,
			PctCAPCoFrPCE: null,
			PctCAPCoFrPGMS: null,
			PctCAPCoFrDeg: null,
			PctCAPCoUEPro: null,
			PctCAPCoUEGros: null,
			PctCAPCoAuPro: null,
			PctCAPCoAuGros: null,
			PctCAGNaissFr: null,
			PctCAGNaissUE: null,
			PctCAGNaissAu: null,
			PctCAGDElvFr: null,
			PctCAGDElvUE: null,
			PctCAGDElvAu: null,
			PctCAGCoFrPro: null,
			PctCAGCoFrDet: null,
			PctCAGCoFrGros: null,
			PctCAGCoFrPCE: null,
			PctCAGCoFrPGMS: null,
			PctCAGCoFrDeg: null,
			PctCAGCoUEPro: null,
			PctCAGCoUEGros: null,
			PctCAGCoAuPro: null,
			PctCAGCoAuGros: null,
			PctCAPoisFr: null,
			PctCAACoqFr: null,
			PctCAACoqUE: null,
			PctCAACoqAu: null,
			PctCAAPAquaFr: null,
			PctCAAPAquaUE: null,
			PctCAAPAquaAu: null,
		},
		donnees_economiques: {
			CATot: 545690.83,
			CAAchRev: 22655.24,
			ArevD: 26865.99,
			Subv: null,
			SubInvest: null,
			Salaire: 163740.14,
			MOExt: 11790.97,
			CHSocNonSal: 11615.41,
			NonSal: 59615.41,
			Energie: 33129.84,
			AchHNaiss: 29700,
			VolAchHNaiss: 3228,
			AchHDElv: null,
			VolAchHDElv: null,
			AchHElv: null,
			VolAchHElv: null,
			AchHConso: 98056.6,
			VolAchHConso: 40766,
			AchMNaiss: null,
			VolAchMnaiss: null,
			AchMDElv: null,
			VolAchMDElv: null,
			AchMConso: 1683.25,
			VolAchMConso: 535,
			AchPNaiss: null,
			VolAchPnaiss: null,
			AchPDElv: null,
			VolAchPDElv: null,
			AchPConso: null,
			VolAchPConso: null,
			AchGNaiss: null,
			VolAchGnaiss: null,
			AchGDElv: null,
			VolAchGDElv: null,
			AchGConso: null,
			VolAchGConso: null,
			AchAcoq: null,
			VolAchAcoq: null,
			AchAPAqua: null,
			VolAchAPAqua: null,
			CtAlim: null,
			CtOp: 111024.83,
			Repar: 35911.46,
			Amort: 101733.41,
			CtFi: 6538.52,
			ProdFi: 174.92,
			Capito: 85827.24,
			CtExcp: 5441.56,
			ProdExcp: 74590.69,
			Actif: 748326.32,
			Invest: 93815.55,
			Acqui_Immo: 117065.55,
			Cess_Immo: 23250,
			Dettes: 662499.08,
			Emprunts: 323199.65,
			CACompt: 568346.07,
			TotProd: 625736.29,
			TotCharge: 610365.99,
			VA: 239898.88,
			EBE: 55980.49,
			ResultatCourant: -53778.83,
			ResultatNet: 15370.3,
		},
	};

	test("204 lors de la soumission d’un bilan au format CGO", async () => {
		const response = await post(`/api/v0/bilan/cgo/${testBilanCGO.siret}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: testBilanCGO,
		});
		expect(response.status).toBe(204);
		const inserted = CGODonneesBilan.assert(
			(await getLastById(bilans)).donnees,
		);
		expect(inserted.stock.StckValHNaisMi).toBe(20000);
	});

	test("400 si un champ inconnu est fourni", async () => {
		const d1 = {
			...testBilanCGO,
			stock: {
				...testBilanCGO.stock,
				newField: "foo",
			},
		};

		let response = await post(`/api/v0/bilan/cgo/${testBilanCGO.siret}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: d1,
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toContain(
			"newField must be removed",
		);

		const d2 = {
			...testBilanCGO,
			production: {
				...testBilanCGO.production,
				newField: "foo",
			},
		};

		response = await post(`/api/v0/bilan/cgo/${testBilanCGO.siret}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: d2,
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toContain(
			"newField must be removed",
		);

		const d3 = {
			...testBilanCGO,
			donnees_economiques: {
				...testBilanCGO.donnees_economiques,
				newField: "foo",
			},
		};

		response = await post(`/api/v0/bilan/cgo/${testBilanCGO.siret}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: d3,
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toContain(
			"newField must be removed",
		);

		const d4 = {
			...testBilanCGO,
			stk: {
				...testBilanCGO.stock,
			},
		};

		response = await post(`/api/v0/bilan/cgo/${testBilanCGO.siret}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data: d4,
		});
		expect(response.status).toBe(400);
		expect((await response.json()).message).toContain("stk must be removed");
	});

	test("400 si un champ ou catégorie est manquante", async () => {
		const data = cloneDeep(testBilanCGO);
		// @ts-expect-error on veut tester une donnée incorrecte
		delete data.stock;

		const response = await post(`/api/v0/bilan/cgo/${testBilanCGO.siret}`, {
			headers: { Authorization: `Bearer ${validAuthToken}` },
			data,
		});
		expect((await response.json()).message).toContain(
			"stock must be an object (was missing)",
		);
		expect(response.status).toBe(400);
	});
});

//
declare module "vitest" {
	export interface ProvidedContext {
		baseUrl: string;
	}
}
