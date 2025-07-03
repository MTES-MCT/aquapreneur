import { eq } from "drizzle-orm";
import colors from "yoctocolors";

import { db } from "$lib/server/db";
import { bilans, evtsJournalReqs } from "$lib/server/db/schema/api";
import { createBilanEntry } from "$lib/server/utils/convert-bilan";

async function main() {
	try {
		const journalEvts = await db
			.select()
			.from(evtsJournalReqs)
			.where(eq(evtsJournalReqs.status, 204))
			.orderBy(evtsJournalReqs.id);
		for (const evt of journalEvts) {
			if (
				(
					await db
						.select()
						.from(bilans)
						.where(eq(bilans.idEvtJournalReqs, evt.id))
						.limit(1)
				).length
			) {
				console.log(`Évènement ${evt.id} déjà converti, ignoré.`);
				continue;
			}
			try {
				const bilanId = await createBilanEntry(evt);
				console.log(`Bilan ${bilanId} créé à partir de l’évènement ${evt.id}.`);
			} catch (err) {
				if (err instanceof Error) {
					console.error(colors.red(err.message));
				} else {
					console.error(colors.red("Erreur inconnue"));
				}
			}
		}
	} finally {
		db.$client.end();
	}
}

main();
