import { type } from "arktype";

export function match(value) {
	return type("string.uuid.v4").allows(value);
}
