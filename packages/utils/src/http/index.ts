import { ofetch, type $Fetch, type FetchOptions } from 'ofetch';
import { type Result, ok, err, tryAsync } from '../result';
import { getLogger } from '../logger';

export interface ApiErrorBody {
  readonly code: string;
  readonly message: string;
  readonly details?: unknown;
}

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly details: unknown;

  constructor(code: string, message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export interface HttpClientOptions {
  readonly baseURL?: string;
  readonly timeout?: number;
  readonly headers?: Record<string, string>;
  readonly onRequest?: (ctx: { url: string; options: FetchOptions }) => void | Promise<void>;
  readonly onResponse?: (ctx: { request: Request; response: Response }) => void | Promise<void>;
  readonly onError?: (error: ApiError) => void | Promise<void>;
}

export class HttpClient {
  readonly #fetch: $Fetch;
  readonly #options: HttpClientOptions;
  readonly #logger = getLogger().child('http');

  constructor(options: HttpClientOptions = {}) {
    this.#options = options;
    this.#fetch = ofetch.create({
      baseURL: options.baseURL,
      timeout: options.timeout ?? 15_000,
      retry: 0,
      onRequest: async ({ options }) => {
        if (options.headers) {
          options.headers = { ...options.headers, ...options.headers };
        }
        const url = options.baseURL ? `${options.baseURL}${options.url ?? ''}` : (options.url ?? '');
        if (this.#options.onRequest) {
          await this.#options.onRequest({ url, options });
        }
        this.#logger.debug('http request', { url, method: options.method ?? 'GET' });
      },
      onResponse: async ({ request, response }) => {
        if (this.#options.onResponse) {
          await this.#options.onResponse({ request, response });
        }
      },
      onResponseError: async ({ response }) => {
        const body = (await response._data?.catch(() => null)) as ApiErrorBody | null;
        const error = new ApiError(
          body?.code ?? 'UNKNOWN',
          body?.message ?? response.statusText ?? 'Request failed',
          response.status,
          body?.details,
        );
        if (this.#options.onError) await this.#options.onError(error);
        this.#logger.warn('http error', { code: error.code, status: error.status });
      },
    });
  }

  get<T>(url: string, options?: FetchOptions): Promise<T> {
    return this.#fetch<T>(url, { ...options, method: 'GET' });
  }
  post<T>(url: string, body?: unknown, options?: FetchOptions): Promise<T> {
    return this.#fetch<T>(url, { ...options, method: 'POST', body });
  }
  put<T>(url: string, body?: unknown, options?: FetchOptions): Promise<T> {
    return this.#fetch<T>(url, { ...options, method: 'PUT', body });
  }
  patch<T>(url: string, body?: unknown, options?: FetchOptions): Promise<T> {
    return this.#fetch<T>(url, { ...options, method: 'PATCH', body });
  }
  delete<T>(url: string, options?: FetchOptions): Promise<T> {
    return this.#fetch<T>(url, { ...options, method: 'DELETE' });
  }

  async tryGet<T>(url: string, options?: FetchOptions): Promise<Result<T, ApiError>> {
    return tryAsync(() => this.get<T>(url, options));
  }
  async tryPost<T>(url: string, body?: unknown, options?: FetchOptions): Promise<Result<T, ApiError>> {
    const result = await tryAsync(() => this.post<T>(url, body, options));
    if (result.ok) return ok(result.value);
    if (result.error instanceof ApiError) return err(result.error);
    return err(new ApiError('NETWORK', result.error.message, 0));
  }
}

export type { FetchOptions, $Fetch };
