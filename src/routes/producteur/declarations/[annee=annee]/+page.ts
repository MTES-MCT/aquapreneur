import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
	const { annee } = await parent();
	redirect(307, `${annee}/entreprise/1`);
};
