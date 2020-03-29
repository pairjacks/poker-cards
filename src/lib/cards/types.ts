export type Card = Readonly<{ suite: Suite; face: Face }>;

export enum Suite {
  Diamonds = 'Diamonds',
  Clubs = 'Clubs',
  Hearts = 'Hearts',
  Spades = 'Spades',
}

export enum Face {
  Two = 'Two',
  Three = 'Three',
  Four = 'Four',
  Five = 'Five',
  Six = 'Six',
  Seven = 'Seven',
  Eight = 'Eight',
  Nine = 'Nine',
  Ten = 'Ten',
  Jack = 'Jack',
  Queen = 'Queen',
  King = 'King',
  Ace = 'Ace',
}
