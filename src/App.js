import { Client } from 'boardgame.io/react';
import { GenerateStandardDeck, DealCards } from './cards';
import { MakeMove, Pass } from './moves';
import board from './renderings/debug';

export function setup(ctx) {
  return {
    lastPlay: null,
    remainingPlayers: [
      ...ctx.playOrder, // NOTE: relying on natural play order for obj key:pair sync
    ],
    hands: DealCards(
      ctx.numPlayers,
      ctx.random.Shuffle(GenerateStandardDeck())
    ),
  };
}

export function next(G, ctx) {
  let nextPlayer = ctx.playOrderPos;

  // go around the table looking for the next `in` player
  do {
    nextPlayer = (nextPlayer + 1) % ctx.numPlayers;
  } while (!G.remainingPlayers.includes(nextPlayer.toString()));

  return nextPlayer;
}

const Thirteen = {
  name: 'thirteen',
  setup,
  moves: { MakeMove, Pass },
  turn: {
    order: {
      first: () => 0,
      next,
    },
  },

  // phases: reorder -> play
};

const App = Client({
  game: Thirteen,
  board,
  numPlayers: 4,
});

export default App;
