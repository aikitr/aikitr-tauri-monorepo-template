import { LazyStore } from '@tauri-apps/plugin-store';
import { isTauri } from './env';

const file = 'aikitr.dat';

class StorageAdapter {
  readonly #store: LazyStore | null;

  constructor() {
    this.#store = isTauri() ? new LazyStore(file) : null;
  }

  async get<T>(key: string): Promise<T | null> {
    if (this.#store) {
      const v = await this.#store.get<T>(key);
      return v ?? null;
    }
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (this.#store) {
      await this.#store.set(key, value);
      await this.#store.save();
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  async delete(key: string): Promise<void> {
    if (this.#store) {
      await this.#store.delete(key);
      await this.#store.save();
      return;
    }
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    if (this.#store) {
      await this.#store.clear();
      await this.#store.save();
      return;
    }
    localStorage.clear();
  }
}

export const storage = new StorageAdapter();
