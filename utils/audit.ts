import { isHttpError } from '@sveltejs/kit';

import { log } from './logger';

export default (msg: string, extra: object = {}, exception: unknown = undefined) => {
  const parsedExc = exception
    ? isHttpError(exception)
      ? { error_status: exception.status, error_message: exception.body.message }
      : { error: (exception as Error).toString() }
    : {};
  log('AUDIT', msg, {
    ...parsedExc,
    ...extra
  });
};
