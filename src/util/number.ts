export function clamp(min: number, max: number, x: number) {
	if (x > max) return max;
	if (x < min) return min;

	return x;
}

export function isInRangeInclusive(min: number, max: number, x: number) {
	return x >= min && x <= max;
}
