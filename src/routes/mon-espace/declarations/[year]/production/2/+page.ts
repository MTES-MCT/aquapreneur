export const load = async ({ parent }) => {
  const { year } = await parent();

  return {
    title: `Déclaration ${year} • Production • 2`,
    year,
    step: 'production'
  };
};
