export const load = async ({ parent }) => {
  const { year } = await parent();

  return {
    title: `Déclaration ${year} • Production • 1`,
    step: 'production'
  };
};
