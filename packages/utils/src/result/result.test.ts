import { describe, it, expect } from 'vitest';
import { ok, err, isOk, isErr, unwrap, tryAsync } from './index';

describe('Result', () => {
  it('constructs ok/err', () => {
    expect(isOk(ok(1))).toBe(true);
    expect(isErr(err('x'))).toBe(true);
  });
  it('unwrap', () => {
    expect(unwrap(ok(42))).toBe(42);
    expect(() => unwrap(err(new Error('boom')))).toThrow('boom');
  });
  it('tryAsync returns ok on success', async () => {
    const r = await tryAsync(() => 1);
    expect(isOk(r)).toBe(true);
  });
  it('tryAsync returns err on throw', async () => {
    const r = await tryAsync(() => {
      throw new Error('nope');
    });
    expect(isErr(r)).toBe(true);
  });
});
