import { Client } from 'boardgame.io/react';
import { GenerateStandardDeck, DealCards } from './cards';
import { MakeMove, Pass } from './moves';
import board from './renderings/debug';

export function setup(ctx) {
  return {
    hands: DealCards(
      ctx.numPlayers,
      ctx.random.Shuffle(GenerateStandardDeck())
    ),
    lastPlay: null,
  };
}

const Thirteen = {
  name: 'thirteen',
  setup,
  moves: { MakeMove, Pass },

  // phases: reorder -> play
};

const App = Client({
  game: Thirteen,
  board,
  numPlayers: 4,
});

export default App;
