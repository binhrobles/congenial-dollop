import Card, { DealCards, RANK, SUIT, GenerateStandardDeck } from './cards';

it('should correctly compare various single cards', () => {
  expect(
    Card.ValueOf(new Card(RANK.TWO, SUIT.H)) >
      Card.ValueOf(new Card(RANK.TWO, SUIT.D))
  ).toBeTruthy();
  expect(
    Card.ValueOf(new Card(RANK.ACE, SUIT.H)) >
      Card.ValueOf(new Card(RANK.TWO, SUIT.S))
  ).toBeFalsy();

  expect(
    Card.ValueOf(new Card(RANK.THREE, SUIT.S)) <
      Card.ValueOf(new Card(RANK.THREE, SUIT.C))
  ).toBeTruthy();
  expect(
    Card.ValueOf(new Card(RANK.EIGHT, SUIT.D)) <
      Card.ValueOf(new Card(RANK.NINE, SUIT.D))
  ).toBeTruthy();
  expect(
    Card.ValueOf(new Card(RANK.KING, SUIT.C)) <
      Card.ValueOf(new Card(RANK.TEN, SUIT.S))
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

it('should evaluate cards to numeric values', () => {
  expect(Card.ValueOf(new Card(RANK.THREE, SUIT.S)).valueOf()).toBe(0);
  expect(Card.ValueOf(new Card(RANK.THREE, SUIT.C)).valueOf()).toBe(1);
  expect(Card.ValueOf(new Card(RANK.TWO, SUIT.D)).valueOf()).toBe(50);
  expect(Card.ValueOf(new Card(RANK.TWO, SUIT.H)).valueOf()).toBe(51);
});
