import { HttpClient } from '@aikitr/utils';
import type { AppPlatform } from '@aikitr/types';
import { isTauri } from './env';

let _client: HttpClient | null = null;

export function initApiClient(options: { baseURL?: string } = {}): HttpClient {
  if (_client) return _client;
  _client = new HttpClient({
    baseURL: options.baseURL ?? '/api',
    timeout: 15_000,
    onRequest: async ({ url, options: opts }) => {
      const headers = new Headers(opts.headers);
      headers.set('X-Client', 'aikitr-desktop');
      headers.set('X-Platform', await getPlatformSafe());
      opts.headers = headers;
    },
    onError: async (err) => {
      // surface to logger transport
      const { logger } = await import('../logger');
      logger.error('api error', { code: err.code, status: err.status, url });
    },
  });
  return _client;
}

export function getApiClient(): HttpClient {
  if (!_client) return initApiClient();
  return _client;
}

async function getPlatformSafe(): Promise<AppPlatform | 'web'> {
  if (!isTauri()) return 'web';
  try {
    const { tauri } = await import('../tauri');
    return await tauri.app.getPlatform();
  } catch {
    return 'web';
  }
}
