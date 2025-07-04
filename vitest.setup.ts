import { reset } from "drizzle-seed";
import { resolve } from "path";
import { ViteDevServer, createServer } from "vite";
import type { TestProject } from "vitest/node";

import { env } from "$env/dynamic/private";

import { db } from "$lib/server/db";
import { bilans, evtsJournalReqs, jetonsApi } from "$lib/server/db/schema/api";
import { concessionsTable } from "$lib/server/db/schema/atena";
import { sessions, utilisateurs } from "$lib/server/db/schema/auth";
import { declarationsTable } from "$lib/server/db/schema/declaration";
import {
	entreprises,
	etablissementsTable,
} from "$lib/server/db/schema/entreprise";

let server: ViteDevServer;
export async function setup(project: TestProject) {
	if (!env.DATABASE_URL) {
		throw new Error(
			"La variable d’environnement DATABASE_URL n’est pas renseignée",
		);
	}

	// On veut être certain de travailler sur une base de test
	if (!db.$client.options.database.includes("-test")) {
		console.error(`Base de donnée utilisée : ${db.$client.options.database}`);
		throw new Error("Les tests doivent utiliser une BDD dédiée");
	}
	// Remise à zero de la BDD de test
	await reset(db, {
		concessionsTable,
		bilans,
		declarationsTable,
		entreprises,
		etablissementsTable,
		jetonsApi,
		journalRequetes: evtsJournalReqs,
		sessions,
		utilisateurs,
	});

	server = await createServer({
		root: resolve(__dirname, "."),
		server: {
			port: 9000,
			fs: {
				strict: false,
			},
		},
		mode: "test",

		// logLevel: "warn",
	});

	project.provide("baseUrl", `http://localhost:${server.config.server.port}`);

	await server.listen();
}

export async function teardown() {
	await server.close();
}

declare module "vitest" {
	export interface ProvidedContext {
		baseUrl: string;
	}
}
