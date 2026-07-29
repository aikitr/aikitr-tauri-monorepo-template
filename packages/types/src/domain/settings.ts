export type ThemeMode = 'light' | 'dark' | 'system';
export type Locale = 'en-US' | 'zh-CN';

export interface UserSettings {
  readonly theme: ThemeMode;
  readonly locale: Locale;
  readonly fontSize: number;
  readonly autoUpdate: boolean;
  readonly sendTelemetry: boolean;
}

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'system',
  locale: 'en-US',
  fontSize: 14,
  autoUpdate: true,
  sendTelemetry: false,
};
