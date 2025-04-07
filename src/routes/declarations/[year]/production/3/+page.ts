export const load = async ({ parent }) => {
  const { year } = await parent();

  return {
    title: `Déclaration ${year} • Production • 3`,
    year,
    step: 'production'
  };
};
