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
	const result: X[] = [];

	for (const x of xs) {
		if (!result.find((a) => value(a) === value(x))) result.push(x);
	}

	return result;
}

export function groupBy<X>(
	value: (x: Readonly<X>) => unknown,
	xs: readonly X[],
) {
	const grouped: Record<string, X[]> = {};

	for (const x of xs) {
		const key = String(value(x));
		const curr = grouped[key];

		if (curr) curr.push(x);
		else grouped[key] = [x];
	}

	return grouped;
}

export function chunkPreviousWith<X>(
	predicate: (current: Readonly<X>, previous: Readonly<X>) => boolean,
	xs: readonly X[],
) {
	const chunks: X[][] = [];

	for (const item of xs) {
		const currentChunk = chunks[chunks.length - 1];

		if (!currentChunk) {
			chunks.push([item]);

			continue;
		}

		const previousItem = currentChunk[currentChunk.length - 1];

		if (previousItem && predicate(item, previousItem)) currentChunk.push(item);
		else chunks.push([item]);
	}

	return chunks;
}

export function allEqualBy<X>(
	value: (x: Readonly<X>) => unknown,
	xs: readonly X[],
) {
	return uniqBy(value, xs).length === 1;
}
