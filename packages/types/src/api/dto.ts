import type { ISODateString } from '../common';

export interface UserDto {
  readonly id: string;
  readonly username: string;
  readonly displayName: string;
  readonly email: string;
  readonly avatarUrl: string | null;
  readonly roles: readonly string[];
  readonly createdAt: ISODateString;
  readonly updatedAt: ISODateString;
}

export interface LoginRequestDto {
  readonly username: string;
  readonly password: string;
}

export interface LoginResponseDto {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresIn: number;
  readonly user: UserDto;
}
