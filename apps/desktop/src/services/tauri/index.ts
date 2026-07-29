export { tauriApp as app } from './app';
export { storage } from './storage';
export { isTauri, isDev, isProd } from './env';

import { tauriApp } from './app';
import { storage } from './storage';

export const tauri = { app: tauriApp, storage };
