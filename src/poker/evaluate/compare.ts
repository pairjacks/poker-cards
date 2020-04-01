import { uniqBy } from '../../util/array';
import { identity } from '../../util/function';
import { extractHand } from './extract';
import { tieBreakers } from './tie-breakers';
import { HandCandidate } from '../types'; // type
import { HandComparisonResult } from './types'; // type

const tieBreak = (results: readonly HandComparisonResult[]) => {
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
      (candidate): HandComparisonResult => ({
        candidate,
        hand: extractHand(candidate),
      }),
    )
    .sort((a, b) => b.hand.rankValue - a.hand.rankValue);
  const maxRankValue = evaluated[0].hand.rankValue;
  const hasMaxRankValue = evaluated.filter(
    ({ hand: ranked }) => ranked.rankValue === maxRankValue,
  );

  if (hasMaxRankValue.length === 1) return hasMaxRankValue;

  return tieBreak(hasMaxRankValue);
};
