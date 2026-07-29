export type Brand<T, B extends string> = T & { readonly __brand: B };

export type Nullable<T> = T | null | undefined;
export type Optional<T> = T | undefined;
export type Awaitable<T> = T | PromiseLike<T>;

export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = T & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];

export type ISODateString = Brand<string, 'ISODateString'>;

export function isoNow(): ISODateString {
  return new Date().toISOString() as ISODateString;
}
