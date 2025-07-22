import { configure } from "arktype/config";

configure({
	onUndeclaredKey: "reject",
	jitless: true,
	exactOptionalPropertyTypes: false,
});
