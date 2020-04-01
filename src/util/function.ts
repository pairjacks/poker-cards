// TODO: Type this properly
/* eslint-disable @typescript-eslint/no-explicit-any */
export const pipe = <R>(fn: any, ...fns: any[]) => (...args: any[]): R =>
  fns.reduce((x, f) => f(x), fn(...args));
/* eslint-enable */

export const memoizeWeakMap = <A extends object, R>(fn: (a: A) => R) => {
  const cache = new WeakMap();

  return function memoizedWeakMap(a: A): R {
    if (!cache.has(a)) cache.set(a, fn(a));

    return cache.get(a);
  };
};
