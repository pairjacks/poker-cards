export const clamp = (min: number, max: number, x: number): number =>
  Math.min(max, Math.max(x, min));

export const isInRangeInclusive = (
  min: number,
  max: number,
  x: number,
): boolean => x >= min && x <= max;
