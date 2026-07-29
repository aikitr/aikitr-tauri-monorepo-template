export function formatDate(input: Date | number | string, locale = 'en-US'): string {
  const d = input instanceof Date ? input : new Date(input);
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(d);
}

export function formatTime(input: Date | number | string, locale = 'en-US'): string {
  const d = input instanceof Date ? input : new Date(input);
  return new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(d);
}

export function formatDateTime(input: Date | number | string, locale = 'en-US'): string {
  const d = input instanceof Date ? input : new Date(input);
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(d);
}

export function fromNow(input: Date | number | string, locale = 'en-US'): string {
  const d = input instanceof Date ? input : new Date(input);
  const diff = (Date.now() - d.getTime()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const abs = Math.abs(diff);
  if (abs < 60) return rtf.format(-Math.round(diff), 'second');
  if (abs < 3600) return rtf.format(-Math.round(diff / 60), 'minute');
  if (abs < 86400) return rtf.format(-Math.round(diff / 3600), 'hour');
  if (abs < 86400 * 30) return rtf.format(-Math.round(diff / 86400), 'day');
  if (abs < 86400 * 365) return rtf.format(-Math.round(diff / (86400 * 30)), 'month');
  return rtf.format(-Math.round(diff / (86400 * 365)), 'year');
}
