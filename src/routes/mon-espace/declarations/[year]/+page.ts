import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
  const { year } = await parent();
  redirect(307, `${year}/entreprise/1`);
};
