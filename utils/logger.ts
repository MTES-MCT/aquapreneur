import type { RequestEvent } from '@sveltejs/kit';

import { getRequestEvent } from '$app/server';

type logLevels = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'AUDIT';

// Adapté de https://github.com/csquared/node-logfmt/blob/master/lib/stringify.js
export const stringify = function (data: object) {
  let line = '';

  for (const key in data) {
    // @ts-expect-error temp
    let value = data[key];
    let is_null = false;
    if (value == null) {
      is_null = true;
      value = '';
    } else value = value.toString();

    const needs_quoting = value.indexOf(' ') > -1 || value.indexOf('=') > -1;
    const needs_escaping = value.indexOf('"') > -1 || value.indexOf('\\') > -1;

    if (needs_escaping) value = value.replace(/["\\]/g, '\\$&');
    if (needs_quoting || needs_escaping) value = '"' + value + '"';
    if (value === '' && !is_null) value = '""';

    line += key + '=' + value + ' ';
  }
  return line.substring(0, line.length - 1);
};

export const getRequestId = () => {
  // https://doc.scalingo.com/platform/app/x-request-id#definition-of-the-x-request-id-header
  return getRequestEvent().request.headers.get('x-request-id');
};

export const log = (level: logLevels, msg: string, extra: object = {}) => {
  console.log(`[${level}]`, msg, stringify({ request_id: getRequestId(), ...extra }));
};

export const canonical = (
  event: RequestEvent,
  userId: number | undefined,
  shortSessionId: string | undefined,
  status: number,
  duration: string
) => {
  const r = event.request;
  const h = r.headers;
  const u = event.url;
  const data = {
    request_id: getRequestId(),
    user_id: userId,
    session_id: shortSessionId,
    method: r.method,
    status,
    duration,
    host: u.host,
    path: u.pathname + u.search,
    from: h.get('x-real-ip'),
    protocol: u.protocol.substring(0, u.protocol.length - 1),
    referer: h.get('referer'),
    user_agent: h.get('user-agent')
  };
  console.log(`[CANONICAL]`, stringify(data));
};

export const debug = (msg: string, extra: object = {}) => {
  // TODO : les masquer hors du dev local
  log('DEBUG', msg, extra);
};

export const info = (msg: string, extra: object = {}) => {
  log('INFO', msg, extra);
};

export const warn = (msg: string, extra: object = {}) => {
  log('WARN', msg, extra);
};

export const error = (msg: string, extra: object = {}) => {
  log('ERROR', msg, extra);
};

export const audit = (msg: string, extra: object = {}) => {
  log('AUDIT', msg, extra);
};
