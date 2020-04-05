import { uniqBy } from '../util/array';
import { identity } from '../util/function';
import { extractHand } from './extract';
import { tieBreakers } from './tie-breakers';
import { getHandRankValue } from './util';
import { HandCandidate, HandComparisonResult } from './types'; // import type

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

  const highestHandIndex = tieBreakers[uniqueRanks[0]](results);

  return highestHandIndex === -1 ? results : [results[highestHandIndex]];
};

// finds highest value hands, multiple values are tied
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
