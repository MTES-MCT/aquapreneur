import { redirect } from "@sveltejs/kit";

export const load = async ({ params }) => {
	const { annee } = params;
	redirect(307, `./${annee}/intro`);
};
