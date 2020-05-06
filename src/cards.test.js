import { Card, DealCards, RANK, SUIT, GenerateStandardDeck } from './cards';

it('should correctly compare various single cards', () => {
  expect(new Card(RANK.TWO, SUIT.H) > new Card(RANK.TWO, SUIT.D)).toBeTruthy();
  expect(new Card(RANK.ACE, SUIT.H) > new Card(RANK.TWO, SUIT.S)).toBeFalsy();

  expect(
    new Card(RANK.THREE, SUIT.S) < new Card(RANK.THREE, SUIT.C)
  ).toBeTruthy();
  expect(
    new Card(RANK.EIGHT, SUIT.D) < new Card(RANK.NINE, SUIT.D)
  ).toBeTruthy();
  expect(new Card(RANK.KING, SUIT.C) < new Card(RANK.TEN, SUIT.S)).toBeFalsy();

  expect(
    new Card(RANK.QUEEN, SUIT.D).equals(new Card(RANK.QUEEN, SUIT.D))
  ).toBeTruthy();
  expect(
    new Card(RANK.TWO, SUIT.D).equals(new Card(RANK.QUEEN, SUIT.D))
  ).toBeFalsy();
});

it('should generate a standard 52 card deck', () => {
  const deck = GenerateStandardDeck();
  const set = new Set(deck);

  expect(deck.length).toBe(52);
  expect(set.size).toBe(52);
});

it('should deal every card just once', () => {
  const hands = DealCards(4, GenerateStandardDeck());

  expect(
    hands[0].length + hands[1].length + hands[2].length + hands[3].length
  ).toEqual(52);

  const recombine = hands.reduce((combined, hand) => combined.concat(hand), []);
  const set = new Set(recombine);
  expect(set.size).toEqual(52);
});
