import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Row } from 'antd';
import Card from '../Card';
import Hand from './hand';
import PlayerOptions from './playerOptions';
import PlayerHUD from './playerHUD';

function PlayerView(props) {
  const {
    cards,
    playerID,
    currentPlayer,
    playersIn,
    isActive,
    moves,
    playerNames,
  } = props;
  const [selected, updateSelected] = React.useState([]);
  const playerCards = cards[playerID];

  function selectCard(id) {
    updateSelected((prev) => prev.concat(id));
  }

  function clear() {
    updateSelected([]);
  }

  // should only return IDs
  function playMove() {
    moves.MakeMove(selected);

    // TODO: we don't get feedback on the result of the move: https://github.com/nicolodavis/boardgame.io/issues/592
    // so check if we're still active, or something, implying the move didn't fire

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
  playerID: PropTypes.number.isRequired,
  currentPlayer: PropTypes.string.isRequired,
  playersIn: PropTypes.arrayOf(PropTypes.string).isRequired,
  moves: PropTypes.shape({
    Pass: PropTypes.func,
    MakeMove: PropTypes.func,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  playerNames: PropTypes.arrayOf(PropTypes.string),
};

PlayerView.defaultProps = {
  playerNames: ['Adri', 'Binh', 'Chris', 'Drake'],
};

export default PlayerView;
