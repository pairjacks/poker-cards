export function isNotNullish<T>(val: T): val is Exclude<T, null | undefined> {
  return typeof val !== 'undefined' && val !== null;
}

export function isFiniteNumber(val: unknown): val is number {
  return Number.isFinite(val);
}
