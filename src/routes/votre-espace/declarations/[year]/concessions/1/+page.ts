export const load = async ({ parent }) => {
	const { year } = await parent();

	return {
		title: `Déclaration ${year} • Concessions • 1`,
		step: "concessions",
	};
};
