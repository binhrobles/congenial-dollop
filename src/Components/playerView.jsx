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

  function selectCard(id) {
    updateSelected((prev) => prev.concat(id));
  }

  function clear() {
    updateSelected([]);
  }

  function playMove() {
    // first dry run the move for validation
    const selectedCards = playerCards.filter((_, idx) =>
      selected.includes(idx)
    );
    const attempt = lastPlay
      ? tryStandardMove(lastPlay, selectedCards)
      : tryOpeningMove(selectedCards);

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
        <Row align="center">
          <Hand
            cards={playerCards.filter((_, idx) => selected.includes(idx))}
          />
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
        <Row align="center" style={{ padding: 10 }}>
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
