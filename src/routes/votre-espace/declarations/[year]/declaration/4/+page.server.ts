import { redirect } from "@sveltejs/kit";

export const actions = {
	default: async () => {
		redirect(303, "5");
	},
};
