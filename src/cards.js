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

export default class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.rankText = Object.keys(RANK)[rank];
    this.suit = suit;
    this.suitText = Object.keys(SUIT)[suit];
  }

  equals(card) {
    return this.valueOf() === card.valueOf();
  }

  valueOf() {
    return this.rank * 4 + this.suit;
  }

  toString() {
    return `${this.suitText}:${this.rankText}`;
  }

  static Compare(a, b) {
    return a.valueOf() - b.valueOf();
  }
}

export function GenerateStandardDeck() {
  const deck = [];
  Object.values(SUIT).forEach((suit) => {
    Object.values(RANK).forEach((rank) => {
      const card = new Card(rank, suit);
      deck.push(card);
    });
  });
  return deck;
}

export function DealCards(numPlayers, deck) {
  const hands = Array(numPlayers)
    .fill()
    .map(() => []); // fills `hands` with unique Array objects

  for (let i = 0; i <= 12; i += 1) {
    hands.forEach((hand) => hand.push(deck.pop()));
  }

  hands.forEach((hand) => hand.sort(Card.Compare));

  return hands;
}
