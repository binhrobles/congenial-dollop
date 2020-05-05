import { Card, RANK, SUIT, generateStandardDeck } from './cards';

it('should correctly compare various single cards', () => {
  expect(new Card(RANK.TWO, SUIT.H) > new Card(RANK.TWO, SUIT.D)).toBeTruthy();
  expect(new Card(RANK.ACE, SUIT.H) > new Card(RANK.TWO, SUIT.S)).toBeFalsy();

  expect(new Card(RANK.THREE, SUIT.S) < new Card(RANK.THREE, SUIT.C)).toBeTruthy();
  expect(new Card(RANK.EIGHT, SUIT.D) < new Card(RANK.NINE, SUIT.D)).toBeTruthy();
  expect(new Card(RANK.KING, SUIT.C) < new Card(RANK.TEN, SUIT.S)).toBeFalsy();

  expect(new Card(RANK.QUEEN, SUIT.D).equals(new Card(RANK.QUEEN, SUIT.D))).toBeTruthy();
  expect(new Card(RANK.TWO, SUIT.D).equals(new Card(RANK.QUEEN, SUIT.D))).toBeFalsy();
});

it('should generate a standard 52 card deck', () => {
  const deck = generateStandardDeck();
  const set = new Set(deck);

  expect(deck.length).toBe(52);
  expect(set.size).toBe(52);
});
