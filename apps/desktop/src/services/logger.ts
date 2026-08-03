import { createLogger, type Logger } from '@aikitr/utils';

let _logger: Logger | null = null;

export function getLogger(): Logger {
  if (!_logger) {
    _logger = createLogger({
      minLevel: import.meta.env.DEV ? 'debug' : 'info',
    });
  }
  return _logger;
}

export const logger: Logger = new Proxy({} as Logger, {
  get(_target, prop) {
    const l = getLogger();
    const value: unknown = Reflect.get(l, prop, l);
    return typeof value === 'function' ? (value as (...a: unknown[]) => unknown).bind(l) : value;
  },
});
