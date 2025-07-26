import assert from "assert";

export const load = async ({ parent }) => {
	const { utilisateur } = await parent();
	assert(utilisateur && utilisateur.valide && utilisateur.estAdmin);

	return {
		// on renvoie de nouveau l’objet utilisateur ici, au lieu de compter sur
		// celui du layout global puisque son type est maintenant plus precis
		// (non null)
		utilisateur,
	};
};
