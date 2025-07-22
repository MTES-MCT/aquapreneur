import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
	const { utilisateur } = await parent();

	// Cette route n’est accessible qu’aux utilisateurs connectés, et validés
	if (!utilisateur) redirect(307, "/");
	if (!utilisateur.valide) redirect(307, "/validation");

	// TODO vérifier que l’utilisateur est bien un comptable
	// Pour l’instant on réserve cette page aux superutilisateurs
	// TODO: tests
	if (!utilisateur.estAdmin) redirect(307, "/");

	return {
		// on renvoie de nouveau l’objet utilisateur ici, au lieu de compter sur
		// celui du layout global puisque son type est maintenant plus precis
		// (non null)
		utilisateur,
	};
};
