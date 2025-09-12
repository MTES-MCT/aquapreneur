import { z } from "zod";

export function match(value) {
	return z.uuid({ version: "v4" }).safeParse(value).success;
}
