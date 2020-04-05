import { uniqBy } from '../util/array';
import { identity } from '../util/function';
import { extractHand } from './extract';
import { tieBreakers } from './tie-breakers';
import { getHandRankValue } from './util';
import { HandCandidate, HandComparisonResult } from './types'; // import type

/**
 * Resolves tied ranks from high level rank comparison
 * @param results - tied hand comparison results
 */
const resolveTiedRank = (results: readonly HandComparisonResult[]) => {
  if (results.length < 2) {
    throw new Error(
      `Expected two or more hands in tie break, got ${results.length}`,
    );
  }

  const uniqueRanks = uniqBy(
    identity,
    results.map(({ hand }) => hand.rank),
  );

  if (uniqueRanks.length > 1) {
    throw new Error(
      `Expected same rank for hands in tie break, got ${uniqueRanks}`,
    );
  }

  const highestHandIndeces = tieBreakers[uniqueRanks[0]](results);

  return highestHandIndeces.map((index) => results[index]);
};

/**
 * Returns an array of highest hands from a list of candidates. Multiple entries indicates a draw.
 * @param candidates - an array of HandCandidates to compare
 */
export const findHighestHands = (
  candidates: readonly HandCandidate[],
): readonly HandComparisonResult[] => {
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
  const maxRankValue = getHandRankValue(evaluated[0].hand.rank);
  const hasMaxRankValue = evaluated.filter(
    ({ hand: ranked }) => getHandRankValue(ranked.rank) === maxRankValue,
  );

  if (hasMaxRankValue.length === 1) return hasMaxRankValue;

  return resolveTiedRank(hasMaxRankValue);
};
