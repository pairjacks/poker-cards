export const clamp = (min: number, max: number, x: number) =>
  Math.min(max, Math.max(x, min));

export const isInRangeInclusive = (min: number, max: number, x: number) =>
  x >= min && x <= max;
