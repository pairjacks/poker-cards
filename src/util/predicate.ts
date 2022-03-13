export const isNonNullable = <T>(val: T): val is NonNullable<T> =>
  typeof val !== 'undefined' && val !== null;

export const isFiniteNumber = (val: unknown): val is number =>
  Number.isFinite(val);
