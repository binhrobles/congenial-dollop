export default function Pass(G, ctx) {
  const playersInRound = [...G.playersInRound].filter(
    (x) => x !== ctx.currentPlayer
  );

  ctx.events.endTurn(); // allow the default `next` function to determine next player

  return {
    ...G,
    playersInRound,
  };
}
