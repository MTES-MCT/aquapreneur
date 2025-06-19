import { Temporal } from "@js-temporal/polyfill";
import { type } from "arktype";

export const Percent = type("0<=number<=100");
export const PositiveInt = type("number.integer>=0");
export const PositiveNumber = type("number>=0");
export const Year = type("1900 <= number.integer <= 2030");

// "YYYY-MM-DD"
export const IsoDate = type("string").pipe((s, ctx) => {
	try {
		return Temporal.PlainDate.from(s).toString();
	} catch (err) {
		if (err instanceof Error) {
			return ctx.error(`a valid date (${err.message})`);
		} else {
			return ctx.error(`a valid date (unknown error)`);
		}
	}
});
