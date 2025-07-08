#!/usr/bin/env -S npx vite-node --options.transformMode.ssr="/.*/"
import { input } from "@inquirer/prompts";
import { type } from "arktype";
import colors from "yoctocolors";

import { db } from "$lib/server/db";
import { jetonsApi } from "$lib/server/db/schema/api";
import { jetonsApiInsertSchema } from "$lib/server/db/types";
import { generateApiToken } from "$lib/server/utils";

const Email = type("string.trim").to("string.email & string.lower");
const Siret = type("string.digits == 14");

async function main() {
	try {
		const cleanSiret = (str: string) => str.trim().replace(/[^0-9]/g, "");

		const nom = await input({
			message: "Saisir le nom du partenaire :",
			required: true,
		});

		const siret = await input({
			message: "Saisir le numéro SIRET du partenaire :",
			required: true,
			validate: (str) => {
				const parsed = Siret(str);
				return parsed instanceof type.errors ? parsed.summary : true;
			},
		});

		const courriel = await input({
			message: "Saisir le courriel de contact du partenaire :",
			required: true,
			validate: (str) => {
				const parsed = Email(str);
				return parsed instanceof type.errors ? parsed.summary : true;
			},
		});

		// Basé sur https://thecopenhagenbook.com/server-side-tokens
		// On génère un token avec 256 bits d’entropie (que les partenaires pourront
		// utiliser dans les appels API) et on le stocke dans la DB après hachage.

		const { token, digest } = generateApiToken();

		const parsingResult = jetonsApiInsertSchema({
			hachage: digest,
			nomPartenaire: nom.trim(),
			siretPartenaire: cleanSiret(siret),
			courrielPartenaire: courriel.trim(),
		});

		if (parsingResult instanceof type.errors) {
			console.error(colors.red(colors.bold(parsingResult.summary)));
			process.exitCode = 1;
			return;
		}

		await db.insert(jetonsApi).values(parsingResult);

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
