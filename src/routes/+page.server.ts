import * as logger from '$utils/logger';

export const load = (event) => {
  logger.audit('audit msg from +page.server.ts');

  return {
    utilisateur: event.locals.utilisateur
  };
};
