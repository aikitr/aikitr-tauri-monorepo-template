import { camelToKebab, kebabToCamel } from '@aikitr/utils';
export { camelToKebab, kebabToCamel, formatBytes, formatDateTime, fromNow, clamp } from '@aikitr/utils';

export function debounce<TArgs extends readonly unknown[]>(
  fn: (...args: TArgs) => void,
  ms: number,
): (...args: TArgs) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: TArgs) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
