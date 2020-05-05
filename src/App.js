import { Client } from 'boardgame.io/react';
import { generateStandardDeck, Card } from './cards';
import { MakeMove } from './moves';

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

  hands.forEach(hand => hand.sort(Card.Compare));

  return hands;
}

const Thirteen = {
  name: 'thirteen',
  setup,
  moves: { MakeMove },

  // phases: reorder -> play
};

const App = Client({
  game: Thirteen,
  numPlayers: 4,
});

export default App;
