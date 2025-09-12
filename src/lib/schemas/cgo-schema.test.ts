import { describe, expect, test } from "vitest";

import { LaxNumValue } from "./cgo-schema";

describe("Tests de LaxNumValue", async () => {
	const schema = LaxNumValue;

	test("LaxNumValue accepte les valeurs numériques", async () => {
		expect(schema.parse(1)).toBe(1);
	});

	test("LaxNumValue accepte les valeurs numériques dans une chaine", async () => {
		expect(schema.parse("1")).toBe(1);
	});

	test("LaxNumValue accepte 0", async () => {
		expect(schema.parse(0)).toBe(0);
	});

	test("LaxNumValue accepte les nombres négatifs", async () => {
		expect(schema.parse(-1)).toBe(-1);
	});

	test("LaxNumValue accepte les décimaux", async () => {
		expect(schema.parse(0.5)).toBe(0.5);
	});

	test("LaxNumValue accepte les chaines décimales avec point", async () => {
		expect(schema.parse("0.5")).toBe(0.5);
	});

	test("LaxNumValue accepte les chaines décimales avec virgules", async () => {
		expect(schema.parse("0,5")).toBe(0.5);
	});

	test("LaxNumValue accepte '0'", async () => {
		expect(schema.parse("0")).toBe(0);
	});

	test("LaxNumValue accepte null", async () => {
		expect(schema.parse(null)).toBe(null);
	});

	test("LaxNumValue accepte undefined", async () => {
		expect(schema.parse(undefined)).toBe(undefined);
	});

	test("LaxNumValue accepte une chaine vide", async () => {
		expect(schema.parse("")).toBe(null);
	});

	test("LaxNumValue refuse les chaines non numériques", async () => {
		expect(schema.safeParse("ABC").success).toBe(false);
	});
});
