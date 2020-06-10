import { INVALID_MOVE } from 'boardgame.io/core';

export default function Pass(G, ctx) {
  // can't be passing when you have power
  if (!G.lastPlay) {
    return INVALID_MOVE;
  }

  const playersInRound = [...G.playersInRound].filter(
    (x) => x !== ctx.currentPlayer
  );

  // store move into game log
  const log = G.log.concat({
    event: 'pass',
    player: ctx.currentPlayer,
  });

  ctx.events.endTurn(); // allow the default `next` function to determine next player

  return {
    ...G,
    log,
    playersInRound,
  };
}
