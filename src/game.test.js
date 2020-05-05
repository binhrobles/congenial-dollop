import { generateStandardDeck } from './cards';
import { dealCards } from './App';

it('should deal every card just once', () => {
  const hands = dealCards(4, generateStandardDeck());

  expect(hands[0].length + hands[1].length + hands[2].length + hands[3].length).toEqual(52);

  const recombine = hands.reduce( (combined, hand) => combined.concat(hand), []);
  const set = new Set(recombine);
  expect(set.size).toEqual(52);
});
