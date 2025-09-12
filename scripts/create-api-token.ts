#!/usr/bin/env -S npx vite-node --options.transformMode.ssr="/.*/"
import { input } from "@inquirer/prompts";
import colors from "yoctocolors";
import { z } from "zod";

import { db } from "$lib/server/db";
import { jetonsApi } from "$lib/server/db/schema/api";
import { jetonsApiInsertSchema } from "$lib/server/db/types";
import { generateApiToken } from "$lib/server/utils";

import { Siret } from "$lib/types";

async function main() {
	try {
		const cleanSiret = (str: string) => str.trim().replace(/[^0-9]/g, "");

		const nomInput = await input({
			message: "Saisir le nom du partenaire :",
			required: true,
		});

		const siretInput = await input({
			message: "Saisir le numéro SIRET du partenaire :",
			required: true,
			validate: (str) => {
				const parsed = Siret.safeParse(str);
				return parsed.success ? true : z.prettifyError(parsed.error);
			},
		});

		const courriel = await input({
			message: "Saisir le courriel de contact du partenaire :",
			required: true,
			validate: (str) => {
				const parsed = z.email().trim().lowercase().safeParse(str);
				return parsed.success ? true : z.prettifyError(parsed.error);
			},
		});

		// Basé sur https://thecopenhagenbook.com/server-side-tokens
		// On génère un token avec 256 bits d’entropie (que les partenaires pourront
		// utiliser dans les appels API) et on le stocke dans la DB après hachage.

		const { token, digest } = generateApiToken();

		const parsingResult = jetonsApiInsertSchema.safeParse({
			hachage: digest,
			nomPartenaire: nomInput.trim(),
			siretPartenaire: cleanSiret(siretInput),
			courrielPartenaire: courriel.trim(),
		});

		if (!parsingResult.success) {
			console.error(
				colors.red(colors.bold(z.prettifyError(parsingResult.error))),
			);
			process.exitCode = 1;
			return;
		}

		await db.insert(jetonsApi).values(parsingResult.data);

		console.log();
		console.log(
			colors.bold("####################################################"),
		);
		console.log(colors.bold("Jeton à transmettre: "));
		console.log(colors.green(colors.bold(token)));
		console.log(
			colors.bold("####################################################"),
		);
		console.log();
	} finally {
		db.$client.end();
	}
}

main();
