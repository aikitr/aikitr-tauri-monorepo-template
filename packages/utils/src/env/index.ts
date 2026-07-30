/// <reference types="vite/client" />

export function isProd(): boolean {
  return import.meta.env?.MODE === 'production';
}

export function isDev(): boolean {
  return import.meta.env?.MODE !== 'production';
}

export function env(key: string, fallback = ''): string {
  const v = (import.meta.env as Record<string, string | undefined>)[key];
  return v ?? fallback;
}
