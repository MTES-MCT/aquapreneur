import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, parent }) => {
  const { year } = params;

  const { utilisateur } = await parent();
  if (!utilisateur) redirect(307, '/');

  const safeYear = Number.parseInt(year);

  if (![2020, 2021, 2022, 2023, 2024].includes(safeYear)) {
    error(404, 'Not Found');
  }

  return {
    year: safeYear,
    utilisateur
  };
};
