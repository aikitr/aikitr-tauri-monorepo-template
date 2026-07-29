import { getApiClient } from './client';
import type { LoginRequestDto, LoginResponseDto, UserDto } from '@aikitr/types';

export const authApi = {
  async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    return getApiClient().post<LoginResponseDto>('/auth/login', payload);
  },
  async logout(): Promise<void> {
    await getApiClient().post('/auth/logout');
  },
  async me(): Promise<UserDto> {
    return getApiClient().get<UserDto>('/auth/me');
  },
};
