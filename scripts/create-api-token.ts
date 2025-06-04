import { input } from "@inquirer/prompts";
import colors from "yoctocolors";
import { z } from "zod";

import { db } from "$db";

import { jetonsApi, jetonsApiInsertSchema } from "$db/schema/api";

import { formatZodError, generateApiToken } from "$utils";

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
			validate: (str) =>
				cleanSiret(str).length === 14 || "Le siret doit comporter 14 chiffres",
		});

		const courriel = await input({
			message: "Saisir le courriel de contact du partenaire :",
			required: true,
			validate: (str) =>
				z.string().email().safeParse(str.trim()).success ||
				"Saisissez une adresse de courriel valide",
		});

		// Basé sur https://thecopenhagenbook.com/server-side-tokens
		// On génère un token avec 256 bits d’entropie (que les partenaires pourront
		// utiliser dans les appels API) et on le stocke dans la DB après hachage.

		const { token, digest } = generateApiToken();

		const parsingResult = jetonsApiInsertSchema.strict().safeParse({
			hachage: digest,
			nomPartenaire: nom.trim(),
			siretPartenaire: cleanSiret(siret),
			courrielPartenaire: courriel.trim(),
		});

		if (parsingResult.success === false) {
			console.error(
				colors.red(colors.bold(formatZodError(parsingResult.error))),
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
