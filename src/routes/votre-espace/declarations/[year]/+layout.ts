import { error } from "@sveltejs/kit";

export const load = async ({ params, data }) => {
	const { year } = params;

	const safeYear = Number.parseInt(year);

	if (![2020, 2021, 2022, 2023, 2024].includes(safeYear)) {
		error(404, "Not Found");
	}

	return {
		year: safeYear,
		bilan: data.bilan,
		concessions: data.concessions,
		etablissement: data.etablissement,
	};
};
