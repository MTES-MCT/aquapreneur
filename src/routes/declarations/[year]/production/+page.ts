import { redirect } from '@sveltejs/kit';

export const load = async () => {
  redirect(307, `production/1`);
};
