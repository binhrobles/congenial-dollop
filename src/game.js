import { GenerateStandardDeck, DealCards } from './Deck';
import MakeMove from './Move/makeMove';
import Pass from './Move/pass';

export function setup(ctx) {
  // deal cards to games players
  const players = { ...ctx.playOrder };
  const hands = DealCards(
    ctx.numPlayers,
    ctx.random.Shuffle(GenerateStandardDeck())
  );
  Object.keys(players).forEach((key, index) => {
    players[key] = hands[index];
  });

  // find the player with the 3 of Spades as their low card
  const has3S =
    Object.keys(players).filter((x) => players[x][0].value === 0)[0] || '0';

  return {
    lastPlay: null,
    log: [
      {
        event: 'power',
        player: has3S,
      },
    ],
    playersInRound: [...ctx.playOrder],
    playersInGame: [...ctx.playOrder],
    winOrder: [],
    players,
    has3S,
  };
}

// eslint-disable-next-line consistent-return
export function onBegin(G, ctx) {
  // if everyone (else other than the lastPlay.player) has passed, clear the board
  // lastPlayer.player may have gone `out`, so other condition would be playersInRound === 0
  if (
    (G.lastPlay &&
      G.lastPlay.player &&
      G.lastPlay.player === ctx.currentPlayer) ||
    G.playersInRound.length === 0
  ) {
    // clears log (except last item) and states who has power
    const log = [G.log[G.log.length - 1]].concat([
      {
        event: 'power',
        player: ctx.currentPlayer,
      },
    ]);
    return {
      ...G,
      log,
      lastPlay: null,
      playersInRound: [...G.playersInGame],
    };
  }
}

// eslint-disable-next-line consistent-return
export function onTurnEnd(G, ctx) {
  // if no more cards, this player is out
  if (G.players[ctx.playOrderPos].length === 0) {
    const winOrder = [...G.winOrder];
    winOrder.push(ctx.currentPlayer);

    const playersInGame = [...G.playersInGame].filter(
      (x) => x !== ctx.currentPlayer
    );

    const playersInRound = [...G.playersInRound].filter(
      (x) => x !== ctx.currentPlayer
    );

    const log = G.log.concat({
      event: 'win',
      player: ctx.currentPlayer,
    });

    return {
      ...G,
      log,
      playersInGame,
      playersInRound,
      winOrder,
    };
  }
}

// eslint-disable-next-line consistent-return
export function endIf(G) {
  if (G.winOrder.length === 3) {
    return { winner: G.winOrder[0] };
  }
}

// Handles turn progression, but only cycles through `G.playersInRound`
export function next(G, ctx) {
  // if no players left in round, it means lastPlayer.player won with the play
  // and the nextPlayer should be person to left of lastPlay.player
  if (G.playersInRound.length === 0) {
    let nextPlayer = parseInt(G.lastPlay.player, 10);
    // go around the table looking for the next `in` player
    do {
      nextPlayer = (nextPlayer + 1) % ctx.numPlayers;
    } while (!G.playersInGame.includes(nextPlayer.toString()));

    return nextPlayer;
  }

  // otherwise, go around the table looking for the next `in` player
  let nextPlayer = ctx.playOrderPos;

  do {
    nextPlayer = (nextPlayer + 1) % ctx.numPlayers;

    // ensure player is in the round (hasn't passed or won)
  } while (!G.playersInRound.includes(nextPlayer.toString()));

  return nextPlayer;
}

const Game = {
  name: 'thirteen',
  setup,
  moves: { MakeMove, Pass },
  turn: {
    onBegin,
    onEnd: onTurnEnd,
    order: {
      first: (G) => parseInt(G.has3S, 10),
      next,
    },
  },
  endIf,
  // phases: trade -> play
  minPlayers: 4,
  maxPlayers: 4,
};

export default Game;
