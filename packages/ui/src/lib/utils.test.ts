import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn()', () => {
  it('merges tailwind classes', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
  it('handles falsy', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b');
  });
});
