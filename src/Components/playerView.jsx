import React from 'react';
import PropTypes from 'prop-types';
import { INVALID_MOVE } from 'boardgame.io/core';
import { Divider, Row, message } from 'antd';
import { tryStandardMove, tryOpeningMove } from '../Move/makeMove';
import Card from '../Card';
import Hand from './hand';
import PlayerOptions from './playerOptions';
import PlayerHUD from './playerHUD';

function PlayerView(props) {
  const {
    cards,
    currentPlayer,
    isActive,
    lastPlay,
    moves,
    playerID,
    playerNames,
    playersIn,
  } = props;
  const [selected, updateSelected] = React.useState([]);
  const playerCards = cards[playerID];

  function selectCard(cardValue) {
    const cardValueInt = parseInt(cardValue, 10);
    const card = playerCards.filter((c) => c.value === cardValueInt)[0];

    updateSelected((prev) => [...new Set(prev.concat(card))]);
  }

  function deselectCard(cardValue) {
    const cardValueInt = parseInt(cardValue, 10);
    updateSelected((prev) =>
      prev.filter((card) => card.value !== cardValueInt)
    );
  }

  function clear() {
    updateSelected([]);
  }

  function playMove() {
    // first dry run the move for validation
    const attempt = lastPlay
      ? tryStandardMove(lastPlay, selected)
      : tryOpeningMove(selected);

    if (attempt === INVALID_MOVE) {
      message.error("You can't do that");
    } else {
      moves.MakeMove(selected);
    }

    clear();
  }

  return (
    <>
      {isActive && (
        <Row justify="center">
          <Hand cards={selected} isActive={isActive} onSelect={deselectCard} />
        </Row>
      )}
      {selected.length === 0 && (
        <PlayerHUD
          cards={cards}
          currentPlayer={currentPlayer}
          playersIn={playersIn}
          playerNames={playerNames}
        />
      )}
      {isActive && (
        <Row justify="center" style={{ padding: 10 }}>
          <PlayerOptions
            selected={selected}
            lastPlay={lastPlay}
            playMove={playMove}
            pass={() => moves.Pass()}
            clear={clear}
          />
        </Row>
      )}
      <Divider style={{ margin: '10px 0' }} />
      <Row align="bottom" justify="center">
        <Hand cards={playerCards} isActive={isActive} onSelect={selectCard} />
      </Row>
    </>
  );
}

PlayerView.propTypes = {
  cards: PropTypes.objectOf(PropTypes.arrayOf(Card)).isRequired,
  currentPlayer: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  lastPlay: PropTypes.instanceOf(Card),
  moves: PropTypes.shape({
    Pass: PropTypes.func,
    MakeMove: PropTypes.func,
  }).isRequired,
  playerID: PropTypes.number.isRequired,
  playersIn: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNames: PropTypes.arrayOf(PropTypes.string),
};

PlayerView.defaultProps = {
  playerNames: ['Adri', 'Binh', 'Chris', 'Drake'],
  lastPlay: null,
};

export default PlayerView;
