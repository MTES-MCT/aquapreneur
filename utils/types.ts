import { Temporal } from "@js-temporal/polyfill";
import { type } from "arktype";

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
