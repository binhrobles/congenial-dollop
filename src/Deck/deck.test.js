import { DealCards, GenerateStandardDeck } from './index';

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
