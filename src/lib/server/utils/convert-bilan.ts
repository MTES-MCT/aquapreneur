import { z } from "zod";

import { db } from "$lib/server/db";
import { bilans } from "$lib/server/db/schema/api";

import { CGORequestData } from "$lib/schemas/cgo-schema";

import { type EvtJournalReqs } from "../db/types";
import { bilansInsertSchema } from "../db/types";

export const createBilanEntry = async (auditLogEntry: EvtJournalReqs) => {
	const parsingResult = CGORequestData.safeParse(auditLogEntry.donnees);
	if (!parsingResult.success) {
		throw new Error(z.prettifyError(parsingResult.error));
	}
	const result = parsingResult.data;

	const parsedBilan = bilansInsertSchema.safeParse({
		idEvtJournalReqs: auditLogEntry.id,
		dateCreation: auditLogEntry.dateCreation,
		dateMaj: auditLogEntry.dateCreation,
		siret: result["siret"],
		nom: result["nom"],
		debutExercice: result["debut_exercice"],
		finExercice: result["fin_exercice"],
		version: result["version"],
		dateBilan: result["date_bilan"],
		donnees: {
			dirigeant_es: result.dirigeant_es,
			stock: result.stock,
			production: result.production,
			destination: result.destination,
			donnees_economiques: result.donnees_economiques,
		},
	});
	if (!parsedBilan.success) {
		throw new Error(z.prettifyError(parsedBilan.error));
	}
	return (await db.insert(bilans).values(parsedBilan.data).returning())[0].id;
};
