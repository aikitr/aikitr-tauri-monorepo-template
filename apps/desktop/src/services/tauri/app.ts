import { invoke } from '@tauri-apps/api/core';
import type { AppInfo, AppPlatform } from '@aikitr/types';
import { isTauri } from './env';

export const tauriApp = {
  async getInfo(): Promise<AppInfo | null> {
    if (!isTauri()) {
      return {
        name: 'Aikitr (web)',
        version: '0.1.0',
        env: 'development',
        platform: 'linux',
        locale: 'en-US',
      };
    }
    const data = await invoke<{ name: string; version: string; env: string }>('get_app_info');
    return {
      name: data.name,
      version: data.version,
      env: (data.env as AppInfo['env']) ?? 'production',
      platform: ((await tauriApp.getPlatform()) as AppPlatform) ?? 'linux',
      locale: typeof navigator !== 'undefined' ? navigator.language : 'en-US',
    };
  },
  async getPlatform(): Promise<AppPlatform> {
    if (!isTauri()) return 'linux';
    const os = await invoke<string>('get_platform');
    if (os === 'darwin' || os === 'macos') return 'macos';
    if (os === 'windows') return 'windows';
    return 'linux';
  },
};
