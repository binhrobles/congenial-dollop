import { Client } from 'boardgame.io/react';
import { GenerateStandardDeck, DealCards } from './cards';
import MakeMove from './moves/makeMove';
import Pass from './moves/pass';
import board from './renderings/debug';

export function setup(ctx) {
  return {
    lastPlay: null,
    playersInRound: [
      ...ctx.playOrder, // NOTE: relying on natural play order for obj key:pair sync
    ],
    playersInGame: [
      ...ctx.playOrder, // NOTE: relying on natural play order for obj key:pair sync
    ],
    winOrder: [],
    hands: DealCards(
      ctx.numPlayers,
      ctx.random.Shuffle(GenerateStandardDeck())
    ),
  };
}

// eslint-disable-next-line consistent-return
export function onEnd(G, ctx) {
  // if no more cards, this player is out
  if (G.hands[ctx.playOrderPos].length === 0) {
    const winOrder = [...G.winOrder];
    winOrder.push(ctx.playOrderPos);

    const playersInGame = [...G.playersInGame].filter(
      (x) => x !== ctx.currentPlayer
    );
    const playersInRound = [...G.playersInRound].filter(
      (x) => x !== ctx.currentPlayer
    );

    return {
      ...G,
      playersInRound,
      playersInGame,
      winOrder,
    };
  }
}

// eslint-disable-next-line consistent-return
export function endIf(G) {
  if (G.winOrder.length === 3) {
    return { winner: G.winOrder.pop() };
  }
}

export function next(G, ctx) {
  let nextPlayer = ctx.playOrderPos;

  // go around the table looking for the next `in` player
  do {
    nextPlayer = (nextPlayer + 1) % ctx.numPlayers;
  } while (!G.playersInRound.includes(nextPlayer.toString()));

  return nextPlayer;
}

export const Thirteen = {
  name: 'thirteen',
  setup,
  moves: { MakeMove, Pass },
  turn: {
    onEnd,
    order: {
      first: () => 0,
      next,
    },
  },

  endIf,

  // phases: reorder -> play
};

const Game = Client({
  game: Thirteen,
  board,
  numPlayers: 4,
});

export default Game;
