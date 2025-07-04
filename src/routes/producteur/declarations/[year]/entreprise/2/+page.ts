export const load = async ({ parent }) => {
	const { year } = await parent();

	return {
		title: `Déclaration ${year} • Entreprise • 2`,
		step: "entreprise",
	};
};
