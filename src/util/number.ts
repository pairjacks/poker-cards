export function clamp(min: number, max: number, x: number) {
  return Math.min(max, Math.max(x, min));
}

export function isInRangeInclusive(min: number, max: number, x: number) {
  return x >= min && x <= max;
}
