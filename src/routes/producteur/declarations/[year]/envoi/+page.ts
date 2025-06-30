export const load = async ({ parent }) => {
	const { year } = await parent();

	return {
		title: `Déclaration ${year} • Envoi`,
		step: "envoi",
	};
};
