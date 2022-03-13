import { uniqBy } from '../util/array';
import { identity } from '../util/function';
import { isNonNullable } from '../util/predicate';
import { extractHand } from './extract';
import { tieBreakers } from './tie-breakers';
import { getHandRankValue } from './util';

import type { HandCandidate, HandComparisonResult } from './types';

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
      `Expected same rank for hands in tie break, got ${String(uniqueRanks)}`,
    );
  }

  const rank = uniqueRanks[0];

  if (!rank) throw new Error('No rank found');

  const highestHandIndeces = tieBreakers[rank](results);

  return highestHandIndeces
    .map((index) => results[index])
    .filter(isNonNullable);
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

  const highestEvaluated = evaluated[0];

  if (!highestEvaluated) throw new Error('No hand found to evaluate');

  const maxRankValue = getHandRankValue(highestEvaluated.hand.rank);
  const [highest, ...rest] = evaluated.filter(
    ({ hand: ranked }) => getHandRankValue(ranked.rank) === maxRankValue,
  );

  if (!highest) throw new Error('No viable hand');

  return rest.length ? resolveTiedRank([highest, ...rest]) : [highest];
};
