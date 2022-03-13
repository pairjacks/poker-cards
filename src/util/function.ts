export const identity = <T>(x: T): T => x;

export const memoize = <A extends object, R>(
  fn: (a: A) => R,
): ((a: A) => R) => {
  const cache = new WeakMap<A, R>();

  return function memoized(a: A): R {
    if (!cache.has(a)) cache.set(a, fn(a));

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return cache.get(a)!;
  };
};
