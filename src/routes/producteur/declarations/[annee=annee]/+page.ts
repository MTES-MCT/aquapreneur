import { redirect } from "@sveltejs/kit";

export const trailingSlash = "always";

export const load = async () => {
	redirect(307, `./entreprise/`);
};
