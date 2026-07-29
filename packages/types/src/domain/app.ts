export type AppEnv = 'development' | 'staging' | 'production';
export type AppPlatform = 'windows' | 'macos' | 'linux';

export interface AppInfo {
  readonly name: string;
  readonly version: string;
  readonly env: AppEnv;
  readonly platform: AppPlatform;
  readonly locale: string;
}
