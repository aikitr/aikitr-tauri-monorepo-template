import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function valueUpdater<T>(updaterOrValue: T | ((old: T) => T), refValue: T): T {
  if (typeof updaterOrValue === 'function') {
    return (updaterOrValue as (old: T) => T)(refValue);
  }
  return updaterOrValue;
}
