export const load = async ({ params }) => {
	const { annee } = params;

	return {
		title: `Déclaration ${annee} • Envoi`,
		step: "envoi",
	};
};
