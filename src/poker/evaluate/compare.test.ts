import { findHighestHand } from './compare';
import {
  ranksFourOfAKind,
  ranksFullHouse,
  ranksTwoPair,
  ranksRoyalFlushContainsOnePair,
} from './__fixtures__/hands';
import { HandRank } from '../constants';

describe('compare', () => {
  describe('findHighestHand', () => {
    it('should find highest hand', () => {
      expect(
        findHighestHand([
          ranksFourOfAKind,
          ranksFullHouse,
          ranksTwoPair,
          ranksRoyalFlushContainsOnePair,
        ]),
      ).toEqual({
        hand: ranksRoyalFlushContainsOnePair,
        rankData: expect.objectContaining({
          rank: HandRank.RoyalFlush,
        }),
      });
    });
  });
});
