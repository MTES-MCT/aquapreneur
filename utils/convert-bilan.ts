import { type } from "arktype";

import { db } from "$db";

import {
	type EvtJournalReqs,
	bilans,
	bilansInsertSchema,
} from "$db/schema/api";

import { CGORequestData } from "$lib/schemas/cgo-schema";

export const createBilanEntry = async (auditLogEntry: EvtJournalReqs) => {
	const parsingResult = CGORequestData(auditLogEntry.data);
	if (parsingResult instanceof type.errors) {
		throw new Error(parsingResult.summary);
	}

	const parsedBilan = bilansInsertSchema({
		idEvtJournalReqs: auditLogEntry.id,
		dateCreation: auditLogEntry.dateCreation,
		dateMaj: auditLogEntry.dateCreation,
		siret: parsingResult["siret"],
		nom: parsingResult["nom"],
		debutExercice: parsingResult["debut_exercice"],
		finExercice: parsingResult["fin_exercice"],
		version: parsingResult["version"],
		dateBilan: parsingResult["date_bilan"],
		donnees: {
			dirigeant_es: parsingResult.dirigeant_es,
			stock: parsingResult.stock,
			production: parsingResult.production,
			destination: parsingResult.destination,
			donnees_economiques: parsingResult.donnees_economiques,
		},
	});
	if (parsedBilan instanceof type.errors) {
		throw new Error(parsedBilan.summary);
	}
	return (await db.insert(bilans).values(parsedBilan).returning())[0].id;
};
