// import audit from '$utils/audit';
import { browser } from '$app/environment';

import type { PageLoad } from './$types';

export const load = (async ({ data }) => {
  if (!browser) {
    const audit = await import('$utils/audit');
    audit.default('audit msg from +page.svelte', data.auditContext);
  }

  return { ...data };
}) satisfies PageLoad;
