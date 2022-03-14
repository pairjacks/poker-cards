export const isNotNullish = <T>(val: T): val is Exclude<T, null | undefined> =>
  typeof val !== 'undefined' && val !== null;

export const isFiniteNumber = (val: unknown): val is number =>
  Number.isFinite(val);
