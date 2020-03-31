export const clamp = (min: number, max: number, x: number) =>
  Math.min(max, Math.max(x, min));

export const range = (min: number, max: number) =>
  Array.from({ length: max - min }, (_, i) => i + min);
