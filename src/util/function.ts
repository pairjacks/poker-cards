export function identity<T>(x: T) {
	return x;
}

export function memoize<A extends object, R>(fn: (a: A) => R) {
	const cache = new WeakMap<A, R>();

	return function memoized(a: A): R {
		if (!cache.has(a)) cache.set(a, fn(a));

		// oxlint-disable-next-line typescript/no-non-null-assertion
		return cache.get(a)!;
	};
}
