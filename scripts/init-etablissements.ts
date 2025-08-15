#!/usr/bin/env -S npx vite-node --options.transformMode.ssr="/.*/"
import { ne } from "drizzle-orm";
import colors from "yoctocolors";

import { db } from "$lib/server/db";
import { bilans } from "$lib/server/db/schema/api";
import { getOrCreateEtablissement } from "$lib/server/utils/sirene";

async function main() {
	const sirets = await db
		.selectDistinct({ siret: bilans.siret })
		.from(bilans)
		.where(ne(bilans.invalide, true));
	for (const siret of sirets.map((s) => s.siret)) {
		try {
			await getOrCreateEtablissement(siret);
		} catch (err) {
			if (err instanceof Error) {
				console.error(colors.red(err.message));
			} else {
				console.error(colors.red("Erreur inconnue"));
			}
		}
	}
	db.$client.end();
}

main();
