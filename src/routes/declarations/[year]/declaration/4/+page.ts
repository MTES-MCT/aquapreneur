export const load = async ({ parent }) => {
  const { year } = await parent();

  return {
    title: `Déclaration ${year} • Déclaration • 4`,
    year,
    step: 'declaration'
  };
};
