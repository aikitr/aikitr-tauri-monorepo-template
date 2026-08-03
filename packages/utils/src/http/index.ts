import { ofetch, type $Fetch, type FetchOptions } from 'ofetch';
import { type Result, ok, err } from '../result';
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
  readonly onError?: (error: ApiError, ctx?: { url?: string }) => void | Promise<void>;
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
      onRequest: async ({ request, options: fetchOpts }) => {
        const url = typeof request === 'string' ? request : request.url;
        if (this.#options.onRequest) {
          await this.#options.onRequest({ url, options: fetchOpts });
        }
        this.#logger.debug('http request', { url, method: fetchOpts.method ?? 'GET' });
      },
      onResponse: async ({ request, response }) => {
        if (this.#options.onResponse) {
          await this.#options.onResponse({ request: request as Request, response });
        }
      },
      onResponseError: async ({ request, response }) => {
        const url = typeof request === 'string' ? request : request.url;
        let body: ApiErrorBody | null;
        try {
          body = (response._data ?? null) as ApiErrorBody | null;
        } catch {
          body = null;
        }
        const error = new ApiError(
          body?.code ?? 'UNKNOWN',
          body?.message ?? response.statusText ?? 'Request failed',
          response.status,
          body?.details,
        );
        if (this.#options.onError) await this.#options.onError(error, { url });
        this.#logger.warn('http error', { code: error.code, status: error.status, url });
      },
    });
  }

  get<T>(url: string, options?: FetchOptions): Promise<T> {
    return this.#fetch<T>(url, { ...options, method: 'GET', responseType: 'json' });
  }
  post<T>(url: string, body?: unknown, options?: FetchOptions): Promise<T> {
    return this.#fetch<T>(url, {
      ...options,
      method: 'POST',
      body: body as BodyInit | Record<string, unknown> | undefined,
      responseType: 'json',
    });
  }
  put<T>(url: string, body?: unknown, options?: FetchOptions): Promise<T> {
    return this.#fetch<T>(url, {
      ...options,
      method: 'PUT',
      body: body as BodyInit | Record<string, unknown> | undefined,
      responseType: 'json',
    });
  }
  patch<T>(url: string, body?: unknown, options?: FetchOptions): Promise<T> {
    return this.#fetch<T>(url, {
      ...options,
      method: 'PATCH',
      body: body as BodyInit | Record<string, unknown> | undefined,
      responseType: 'json',
    });
  }
  delete<T>(url: string, options?: FetchOptions): Promise<T> {
    return this.#fetch<T>(url, { ...options, method: 'DELETE', responseType: 'json' });
  }

  async tryGet<T>(url: string, options?: FetchOptions): Promise<Result<T, ApiError>> {
    try {
      return ok(await this.get<T>(url, options));
    } catch (e) {
      if (e instanceof ApiError) return err(e);
      return err(new ApiError('NETWORK', e instanceof Error ? e.message : String(e), 0));
    }
  }
  async tryPost<T>(
    url: string,
    body?: unknown,
    options?: FetchOptions,
  ): Promise<Result<T, ApiError>> {
    try {
      return ok(await this.post<T>(url, body, options));
    } catch (e) {
      if (e instanceof ApiError) return err(e);
      return err(new ApiError('NETWORK', e instanceof Error ? e.message : String(e), 0));
    }
  }
}

export type { FetchOptions, $Fetch };
