export const load = async ({ params }) => {
	const { annee } = params;

	return {
		title: `Déclaration ${annee} • Concessions • 2`,
		step: "concessions",
	};
};
