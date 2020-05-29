import { INVALID_MOVE } from 'boardgame.io/core';
import Play from '../Play';
import { COMBO } from '../Play/constants';
import { RANK } from '../Card/constants';

export function getCardsFromIds(hand, ids) {
  const cards = [];

  ids.forEach((id) => {
    // instead of copying from proxied `G` object, create local versions
    cards.push({ ...hand[id] });
  });

  return cards;
}

export function tryChop(lastPlayLength, attemptedCards) {
  const attemptedCombo = Play.DetermineCombo(attemptedCards);

  if (
    (lastPlayLength === 1 && attemptedCombo === COMBO.QUAD) || // if single and beating with a quad
    ((lastPlayLength + 2) * 2 === attemptedCards.length && // or if beating with a bomb of adequate length
      attemptedCombo === COMBO.BOMB)
  ) {
    return new Play(attemptedCombo, attemptedCards);
  }

  return INVALID_MOVE;
}

export function tryStandardMove(lastPlay, attemptedCards) {
  if (!Play.MatchesCombo(lastPlay, attemptedCards)) {
    // generally, if this play isn't of the same combo type, we can disqualify,
    // but in the case of twos being chopped, we can switch to BOMBs or QUADs
    if (lastPlay.cards[0].rank === RANK.TWO) {
      return tryChop(lastPlay.cards.length, attemptedCards);
    }

    return INVALID_MOVE;
  }

  const attemptedPlay = new Play(lastPlay.combo, attemptedCards);

  if (lastPlay.value > attemptedPlay.value) {
    return INVALID_MOVE;
  }

  return attemptedPlay;
}

export function tryOpeningMove(cards) {
  const combo = Play.DetermineCombo(cards);

  if (combo === COMBO.INVALID || combo === COMBO.BOMB) {
    return INVALID_MOVE;
  }

  // TODO: suited?
  return new Play(combo, cards);
}

export default function MakeMove(G, ctx, cardIds) {
  // ensure card selection is valid (should be done on the client as well)
  const selectionSet = new Set(cardIds);
  if (cardIds.length !== selectionSet.size) return INVALID_MOVE;

  const cards = getCardsFromIds(G.players[ctx.playOrderPos], cardIds);

  const currentPlay = G.lastPlay
    ? tryStandardMove(G.lastPlay, cards)
    : tryOpeningMove(cards);
  if (currentPlay === INVALID_MOVE) return INVALID_MOVE;
  currentPlay.player = ctx.currentPlayer;

  // deep copy object so we don't modify state
  const newPlayers = JSON.parse(JSON.stringify(G.players));

  // reverse array before splicing ids, since array will be modified
  cardIds
    .sort((a, b) => b - a) // sorts descending order
    .forEach((id) => {
      newPlayers[ctx.playOrderPos].splice(id, 1);
    });

  // add remaining cards to log
  currentPlay.cardsRemaining = newPlayers[ctx.playOrderPos].length;

  ctx.events.endTurn();

  // store move into game log
  // TODO: the log object should be a standard object
  const log = G.log.concat({ event: 'move', play: currentPlay });

  return {
    ...G,
    log,
    players: newPlayers,
    lastPlay: currentPlay,
  };
}
