// using ...With / ...By naming to resemble lodash / ramda counterparts
// ...With generally takes a predicate (x, y) => boolean
// ...By generally takes a value function (x) => unknown

// asymmetrical difference
export function differenceWith<X, Y>(
	predicate: (x: Readonly<X>, y: Readonly<Y>) => boolean,
	xs: readonly X[],
	ys: readonly Y[],
) {
	return xs.filter((x) => !ys.find((y) => predicate(x, y)));
}

export function uniqBy<X>(
	value: (x: Readonly<X>) => unknown,
	xs: readonly X[],
) {
	return xs.reduce<X[]>((acc, x) => {
		if (!acc.find((a) => value(a) === value(x))) acc.push(x);

		return acc;
	}, []);
}

export function groupBy<X>(
	value: (x: Readonly<X>) => unknown,
	xs: readonly X[],
) {
	return xs.reduce<Record<string, X[]>>((acc, x) => {
		const key = String(value(x));
		const curr = acc[key];

		if (curr) curr.push(x);
		else acc[key] = [x];

		return acc;
	}, {});
}

export function chunkPreviousWith<X>(
	predicate: (current: Readonly<X>, previous: Readonly<X>) => boolean,
	xs: readonly X[],
) {
	return xs.reduce<X[][]>((chunks, item) => {
		const currentChunk = chunks[chunks.length - 1];

		if (!currentChunk) return [[item]];

		const previousItem = currentChunk[currentChunk.length - 1];

		if (previousItem && predicate(item, previousItem)) currentChunk.push(item);
		else chunks.push([item]);

		return chunks;
	}, []);
}

export function allEqualBy<X>(
	value: (x: Readonly<X>) => unknown,
	xs: readonly X[],
) {
	return uniqBy(value, xs).length === 1;
}
