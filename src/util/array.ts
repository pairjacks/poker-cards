// asymmetrical difference
export const differenceBy = <X, Y>(
  matcher: (x: Readonly<X>, y: Readonly<Y>) => boolean,
  xs: readonly X[],
  ys: readonly Y[],
) => xs.filter((x) => !ys.find((y) => matcher(x, y)));

export const uniqBy = <X>(
  matcher: (x: Readonly<X>) => unknown,
  xs: readonly X[],
) =>
  xs.reduce((acc, x) => {
    if (!acc.find((a) => matcher(a) === matcher(x))) acc.push(x);

    return acc;
  }, [] as X[]);

export const groupBy = <X>(
  matcher: (x: Readonly<X>) => unknown,
  xs: readonly X[],
) =>
  xs.reduce((acc, x) => {
    const value = String(matcher(x));

    if (acc[value]) acc[value].push(x);
    else acc[value] = [x];

    return acc;
  }, {} as { [key: string]: X[] });

export const chunkWithPreviousBy = <X>(
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
