export const load = async ({ params }) => {
	const { annee } = params;

	return {
		title: `Déclaration ${annee} • Stock • 1`,
		step: "stock",
	};
};
