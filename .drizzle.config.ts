import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/lib/server/db/schema/*.ts",
	out: "./migrations",
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
	migrations: {
		table: "migrations",
		schema: "drizzle",
	},
	verbose: true,
	strict: true,
	casing: "snake_case",
	breakpoints: false,
	schemaFilter: ["public", "atena"],
});
