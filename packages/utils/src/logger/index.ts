export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
  readonly scope?: string;
  readonly [key: string]: unknown;
}

export interface LogTransport {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
}

export interface LoggerOptions {
  readonly minLevel?: LogLevel;
  readonly scope?: string;
  readonly transports?: readonly LogTransport[];
  readonly timestamp?: () => string;
}

const LEVELS: Readonly<Record<LogLevel, number>> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export class ConsoleTransport implements LogTransport {
  debug(message: string, context?: LogContext): void {
    // eslint-disable-next-line no-console
    console.debug(`[debug] ${message}`, context ?? '');
  }
  info(message: string, context?: LogContext): void {
    // eslint-disable-next-line no-console
    console.info(`[info] ${message}`, context ?? '');
  }
  warn(message: string, context?: LogContext): void {
    console.warn(`[warn] ${message}`, context ?? '');
  }
  error(message: string, context?: LogContext): void {
    console.error(`[error] ${message}`, context ?? '');
  }
}

export class Logger {
  readonly #minLevel: number;
  readonly #scope?: string;
  readonly #transports: readonly LogTransport[];
  readonly #timestamp: () => string;

  constructor(options: LoggerOptions = {}) {
    this.#minLevel = LEVELS[options.minLevel ?? 'info'];
    this.#scope = options.scope;
    this.#transports = options.transports ?? [new ConsoleTransport()];
    this.#timestamp = options.timestamp ?? (() => new Date().toISOString());
  }

  child(scope: string, _extra?: LogContext): Logger {
    const childLogger = new Logger({
      minLevel: this.#minLevelToName(),
      scope: this.#scope ? `${this.#scope}:${scope}` : scope,
      transports: this.#transports,
      timestamp: this.#timestamp,
    });
    return childLogger;
  }

  debug(message: string, context?: LogContext): void {
    if (this.#minLevel > LEVELS.debug) return;
    this.#emit('debug', message, context);
  }

  info(message: string, context?: LogContext): void {
    if (this.#minLevel > LEVELS.info) return;
    this.#emit('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    if (this.#minLevel > LEVELS.warn) return;
    this.#emit('warn', message, context);
  }

  error(message: string, context?: LogContext): void {
    if (this.#minLevel > LEVELS.error) return;
    this.#emit('error', message, context);
  }

  #minLevelToName(): LogLevel {
    return (Object.keys(LEVELS) as LogLevel[]).find((k) => LEVELS[k] === this.#minLevel) ?? 'info';
  }

  #emit(level: LogLevel, message: string, context?: LogContext): void {
    const enriched: LogContext = {
      ts: this.#timestamp(),
      scope: this.#scope,
      ...context,
    };
    for (const t of this.#transports) t[level](message, enriched);
  }
}

let defaultLogger: Logger | undefined;

export function getLogger(): Logger {
  if (!defaultLogger) defaultLogger = new Logger({ minLevel: 'info' });
  return defaultLogger;
}

export function setLogger(logger: Logger): void {
  defaultLogger = logger;
}

export function createLogger(options?: LoggerOptions): Logger {
  return new Logger(options);
}
