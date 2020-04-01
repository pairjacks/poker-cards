// using ...With / ...By naming to resemble lodash / ramda counterparts
// ...With generally takes a predicate (x, y) => boolean
// ...By generally takes a value function (x) => unknown

// asymmetrical difference
export const differenceWith = <X, Y>(
  predicate: (x: Readonly<X>, y: Readonly<Y>) => boolean,
  xs: readonly X[],
  ys: readonly Y[],
) => xs.filter((x) => !ys.find((y) => predicate(x, y)));

export const uniqBy = <X>(
  value: (x: Readonly<X>) => unknown,
  xs: readonly X[],
) =>
  xs.reduce((acc, x) => {
    if (!acc.find((a) => value(a) === value(x))) acc.push(x);

    return acc;
  }, [] as X[]);

export const groupBy = <X>(
  value: (x: Readonly<X>) => unknown,
  xs: readonly X[],
) =>
  xs.reduce((acc, x) => {
    const key = String(value(x));

    if (acc[key]) acc[key].push(x);
    else acc[key] = [x];

    return acc;
  }, {} as { [key: string]: X[] });

export const chunkPreviousWith = <X>(
  predicate: (current: Readonly<X>, previous: Readonly<X>) => boolean,
  xs: readonly X[],
) =>
  xs.reduce((groups, item) => {
    if (!groups.length) return [[item]];

    const currentGroup = groups[groups.length - 1];
    const previousItem = currentGroup[currentGroup.length - 1];

    if (predicate(item, previousItem)) currentGroup.push(item);
    else groups.push([item]);

    return groups;
  }, [] as X[][]);
