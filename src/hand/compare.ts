import { uniqBy } from "../util/array.js";
import { identity } from "../util/function.js";
import { isNotNullish } from "../util/predicate.js";
import { extractHand } from "./extract.js";
import { tieBreakers } from "./tie-breakers.js";
import { getHandRankValue } from "./util.js";

import type { HandCandidate, HandComparisonResult } from "./types.js";

/**
 * Returns an array of highest hands from a list of candidates. Multiple entries indicates a draw.
 * @param candidates - an array of HandCandidates to compare
 */
export function findHighestHands(
	candidates: readonly HandCandidate[],
): readonly HandComparisonResult[] {
	const evaluated = candidates
		.map(
			(candidate, candidateIndex): HandComparisonResult => ({
				candidate,
				candidateIndex,
				hand: extractHand(candidate),
			}),
		)
		.sort(
			(a, b) => getHandRankValue(b.hand.rank) - getHandRankValue(a.hand.rank),
		);

	const highestEvaluated = evaluated[0];

	if (!highestEvaluated) throw new Error("No hand found to evaluate");

	const maxRankValue = getHandRankValue(highestEvaluated.hand.rank);
	const handsWithMaxRank = evaluated.filter(
		({ hand }) => getHandRankValue(hand.rank) === maxRankValue,
	);

	return resolveTies(handsWithMaxRank);
}

/**
 * Resolves tied ranks from high level rank comparison
 * @param results - tied hand comparison results
 */
function resolveTies([first, ...rest]: readonly HandComparisonResult[]) {
	if (!first) throw new Error("No hand found in comparison results");

	if (!rest.length) return [first];

	const results = [first, ...rest];
	const uniqueRanks = uniqBy(
		identity,
		results.map(({ hand }) => hand.rank),
	);

	if (uniqueRanks.length > 1) {
		throw new Error(
			`Expected same rank for hands in tie break, got ${String(uniqueRanks)}`,
		);
	}

	const rank = uniqueRanks[0];

	if (!rank) throw new Error("No viable rank found for comparison");

	return tieBreakers[rank](results)
		.map((index) => results[index])
		.filter(isNotNullish);
}
