// using ...With / ...By naming to resemble lodash / ramda counterparts
// ...With generally takes a predicate (x, y) => boolean
// ...By generally takes a value function (x) => unknown

// asymmetrical difference
export const differenceWith = <X, Y>(
  predicate: (x: Readonly<X>, y: Readonly<Y>) => boolean,
  xs: readonly X[],
  ys: readonly Y[],
): X[] => xs.filter((x) => !ys.find((y) => predicate(x, y)));

export const uniqBy = <X>(
  value: (x: Readonly<X>) => unknown,
  xs: readonly X[],
): X[] =>
  xs.reduce((acc, x) => {
    if (!acc.find((a) => value(a) === value(x))) acc.push(x);

    return acc;
  }, [] as X[]);

export const groupBy = <X>(
  value: (x: Readonly<X>) => unknown,
  xs: readonly X[],
): { [key: string]: X[] } =>
  xs.reduce((acc, x) => {
    const key = String(value(x));
    const curr = acc[key];

    if (curr) curr.push(x);
    else acc[key] = [x];

    return acc;
  }, {} as { [key: string]: X[] });

export const chunkPreviousWith = <X>(
  predicate: (current: Readonly<X>, previous: Readonly<X>) => boolean,
  xs: readonly X[],
): X[][] =>
  xs.reduce((chunks, item) => {
    const currentChunk = chunks.at(-1);

    if (!currentChunk) return [[item]];

    const previousItem = currentChunk.at(-1);

    if (previousItem && predicate(item, previousItem)) currentChunk.push(item);
    else chunks.push([item]);

    return chunks;
  }, [] as X[][]);

export const allEqualBy = <X>(
  value: (x: Readonly<X>) => unknown,
  xs: readonly X[],
): boolean => uniqBy(value, xs).length === 1;
