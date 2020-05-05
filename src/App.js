import { Client } from 'boardgame.io/react';
import { generateStandardDeck } from './cards';
import { OpeningPlay, ResponsePlay } from './moves';

export function setup(ctx) {
  return {
    hands: dealCards(ctx.numPlayers, ctx.random.Shuffle(generateStandardDeck())),
    lastPlay: null,
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
  setup,
  moves: { OpeningPlay, ResponsePlay },
};

const App = Client({
  game: Thirteen,
  numPlayers: 4,
});

export default App;