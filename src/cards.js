export const SUIT = Object.freeze({
  S: 0,
  C: 1,
  D: 2,
  H: 3,
});

export const RANK = Object.freeze({
  THREE: 0,
  FOUR: 1,
  FIVE: 2,
  SIX: 3,
  SEVEN: 4,
  EIGHT: 5,
  NINE: 6,
  TEN: 7,
  JACK: 8,
  QUEEN: 9,
  KING: 10,
  ACE: 11,
  TWO: 12,
});

export class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  equals(card) {
    return this.valueOf() === card.valueOf();
  }

  valueOf() {
    return this.rank * 4 + this.suit;
  }

  toString() {
    return `${Object.keys(SUIT)[this.suit]}:${Object.keys(RANK)[this.rank]}`;
  }

  static Compare(a, b) {
    return a.valueOf() - b.valueOf();
  }
}

export function generateStandardDeck() {
  const deck = [];
  for (const suit in Object.keys(SUIT)) {
    for (const rank in Object.keys(RANK)) {
      deck.push(new Card(rank, suit));
    }
  }
  return deck;
}
