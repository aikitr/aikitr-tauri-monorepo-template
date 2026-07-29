/**
 * Runtime detection helpers.
 */

export function isTauri(): boolean {
  return (
    typeof window !== 'undefined' &&
    '__TAURI_INTERNALS__' in window
  );
}

export function isDev(): boolean {
  return import.meta.env.DEV;
}

export function isProd(): boolean {
  return import.meta.env.PROD;
}
