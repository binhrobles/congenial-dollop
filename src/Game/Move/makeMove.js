import { INVALID_MOVE } from 'boardgame.io/core';
import Play, { COMBO, isSuited } from '../Play';
import { RANK } from '../Card';

export function tryChop(lastPlayLength, attemptedCards) {
  const attemptedCombo = Play.DetermineCombo(attemptedCards);

  if (
    (lastPlayLength === 1 && attemptedCombo === COMBO.QUAD) || // if single and beating with a quad
    ((lastPlayLength + 2) * 2 === attemptedCards.length && // or if beating with a bomb of adequate length
      attemptedCombo === COMBO.BOMB)
  ) {
    return new Play(attemptedCombo, attemptedCards);
  }

  throw new Error(`You need to play a valid chopper`);
}

export function tryStandardMove(lastPlay, attemptedCards) {
  if (!Play.MatchesCombo(lastPlay, attemptedCards)) {
    // generally, if this play isn't of the same combo type, we can disqualify,
    // but in the case of twos being chopped, we can switch to BOMBs or QUADs
    if (lastPlay.cards[0].rank === RANK.TWO) {
      return tryChop(lastPlay.cards.length, attemptedCards);
    }

    throw new Error(`You need to play a ${lastPlay.combo}`);
  }

  if (
    lastPlay.combo === COMBO.RUN &&
    lastPlay.suited &&
    !isSuited(attemptedCards)
  ) {
    throw new Error('You need to play a suited run');
  }

  const attemptedPlay = new Play(
    lastPlay.combo,
    attemptedCards,
    lastPlay.suited
  );

  if (lastPlay.value > attemptedPlay.value) {
    throw new Error("That doesn't beat the last play");
  }

  return attemptedPlay;
}

export function tryOpeningMove(cards) {
  const combo = Play.DetermineCombo(cards);

  if (combo === COMBO.INVALID) {
    throw new Error("That's not a real hand");
  }
  if (combo === COMBO.BOMB) {
    throw new Error("You can't open with a bomb");
  }

  return new Play(combo, cards);
}

export default function MakeMove(G, ctx, play) {
  // ensure what we're being passed will work
  // the client should've already packaged this move
  try {
    if (!G.lastPlay) {
      tryOpeningMove(play.cards);
    } else {
      tryStandardMove(G.lastPlay, play.cards);
    }
  } catch (_) {
    return INVALID_MOVE;
  }

  // ensure card selection is valid (should be done on the client as well)
  if (play === INVALID_MOVE) return INVALID_MOVE;

  // deep copy object so we don't modify state
  const newPlayers = JSON.parse(JSON.stringify(G.players));

  // find and remove the cards from the state array
  const playedCardValues = play.cards.map((c) => c.value);

  newPlayers[ctx.playOrderPos] = newPlayers[ctx.playOrderPos].filter(
    (card) => !playedCardValues.includes(card.value)
  );

  ctx.events.endTurn();

  // store move into game log
  const log = G.log.concat({
    event: 'move',
    player: ctx.currentPlayer,
    play,
  });

  return {
    ...G,
    log,
    players: newPlayers,
    lastPlay: play,
  };
}
