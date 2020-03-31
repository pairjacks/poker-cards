export enum HandRank {
  HighCard = 'HighCard',
  OnePair = 'OnePair',
  TwoPair = 'TwoPair',
  ThreeOfAKind = 'ThreeOfAKind',
  Straight = 'Straight',
  Flush = 'Flush',
  FullHouse = 'FullHouse',
  FourOfAKind = 'FourOfAKind',
  StraightFlush = 'StraightFlush',
  RoyalFlush = 'RoyalFlush',
}

export const handRankValueMap = {
  [HandRank.RoyalFlush]: 10,
  [HandRank.StraightFlush]: 9,
  [HandRank.FourOfAKind]: 8,
  [HandRank.FullHouse]: 7,
  [HandRank.Flush]: 6,
  [HandRank.Straight]: 5,
  [HandRank.ThreeOfAKind]: 4,
  [HandRank.TwoPair]: 3,
  [HandRank.OnePair]: 2,
  [HandRank.HighCard]: 1,
};
