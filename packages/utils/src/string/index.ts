export function kebabToCamel(input: string): string {
  return input.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

export function camelToKebab(input: string): string {
  return input.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function truncate(text: string, max = 100, suffix = '...'): string {
  if (text.length <= max) return text;
  return text.slice(0, max - suffix.length) + suffix;
}

export function isEmptyString(s: string | null | undefined): s is null | undefined | '' {
  return s === null || s === undefined || s.length === 0;
}
