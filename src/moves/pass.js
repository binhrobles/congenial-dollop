export default function Pass(G, ctx) {
  const playersInRound = [...G.playersInRound].filter(
    (x) => x !== ctx.currentPlayer
  );

  // if everyone but 1 has passed, clear the board
  if (playersInRound.length === 1) {
    let nextPlayer = playersInRound[0];

    // if they don't have anymore cards, find next remaining player
    if (G.hands[ctx.playOrderPos].length === 0) {
      // go around the table looking for the next `in` player
      do {
        nextPlayer = (nextPlayer + 1) % ctx.numPlayers;
      } while (!G.playersInGame.includes(nextPlayer.toString()));
    }

    ctx.events.endTurn({ next: nextPlayer });

    return {
      ...G,
      lastPlay: null,
      playersInRound: [...G.playersInGame],
    };
  }

  ctx.events.endTurn(); // allow the default `turn` function to determine next player
  return {
    ...G,
    playersInRound,
  };
}
