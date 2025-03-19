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

export const canonical = (data: object) => {
  console.info('[INFO] canonical-log-line', stringify(data));
};

export const info = (msg: string, extra: object) => {
  console.info('[INFO]', msg, stringify(extra));
};
