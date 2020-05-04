import { Client } from 'boardgame.io/react';
import { STANDARD_DECK } from './constants';
// import assert from 'assert';

export function init(ctx) {
  return {
    hands: dealCards(ctx.numPlayers, ctx.random.Shuffle(STANDARD_DECK)),
  };
}

export function dealCards(numPlayers, deck) {
  const hands = Array(numPlayers).fill().map(() => []); // fills `hands` with unique Array objects

  for (let i = 0; i <= 12; i++) {
    hands.forEach(hand => hand.push(deck.pop()));
  }

  return hands;
}

const Thirteen = {
  name: 'thirteen',
  setup: ctx => init(ctx),
};

const App = Client({
  game: Thirteen,
  numPlayers: 4,
});

export default App;
