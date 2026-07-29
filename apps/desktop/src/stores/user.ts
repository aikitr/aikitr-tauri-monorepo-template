import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UserDto, LoginResponseDto } from '@aikitr/types';
import { authApi } from '@/services/api/auth';
import { storage } from '@/services/tauri';
import { logger } from '@/services/logger';

const STORAGE_KEY = 'aikitr.user.v1';
const TOKEN_KEY = 'aikitr.token.v1';

interface StoredAuth {
  readonly user: UserDto;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresAt: number;
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserDto | null>(null);
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const expiresAt = ref<number>(0);

  const isAuthenticated = computed<boolean>(() => {
    if (!accessToken.value || !user.value) return false;
    return expiresAt.value === 0 || expiresAt.value > Date.now();
  });

  async function hydrate(): Promise<void> {
    try {
      const stored = await storage.get<StoredAuth>(STORAGE_KEY);
      if (stored) {
        user.value = stored.user;
        accessToken.value = stored.accessToken;
        refreshToken.value = stored.refreshToken;
        expiresAt.value = stored.expiresAt;
      }
    } catch (e) {
      logger.warn('user hydrate failed', { error: String(e) });
    }
  }

  async function login(username: string, password: string): Promise<void> {
    const res: LoginResponseDto = await authApi.login({ username, password });
    user.value = res.user;
    accessToken.value = res.accessToken;
    refreshToken.value = res.refreshToken;
    expiresAt.value = Date.now() + res.expiresIn * 1000;
    await persist();
    logger.info('user logged in', { id: res.user.id });
  }

  async function logout(): Promise<void> {
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    expiresAt.value = 0;
    try {
      await storage.delete(STORAGE_KEY);
      await storage.delete(TOKEN_KEY);
    } catch (e) {
      logger.warn('user cleanup failed', { error: String(e) });
    }
  }

  async function persist(): Promise<void> {
    if (!user.value || !accessToken.value || !refreshToken.value) return;
    await storage.set<StoredAuth>(STORAGE_KEY, {
      user: user.value,
      accessToken: accessToken.value,
      refreshToken: refreshToken.value,
      expiresAt: expiresAt.value,
    });
  }

  return {
    user,
    accessToken,
    refreshToken,
    expiresAt,
    isAuthenticated,
    hydrate,
    login,
    logout,
  };
});
