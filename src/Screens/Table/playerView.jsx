import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Row } from 'antd';
import Card from '../../Game/Card';
import { Hand } from '../../Components';
import PlayerOptions from './playerOptions';
import PlayerHUD from './playerHUD';
import PlayerContext from '../../Contexts/PlayerContext';

function PlayerView(props) {
  const {
    cards,
    currentPlayer,
    isActive,
    lastPlay,
    moves,
    playerNames,
    playersIn,
  } = props;
  const { playerID, isSpectator } = React.useContext(PlayerContext);

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
            moves={moves}
            updateSelected={updateSelected}
          />
        </Row>
      )}
      {!isSpectator && (
        <>
          <Divider style={{ margin: '10px 0' }} />
          <Row align="bottom" justify="center">
            <Hand
              cards={playerCards}
              isActive={isActive}
              onSelect={selectCard}
            />
          </Row>
        </>
      )}
    </>
  );
}

PlayerView.propTypes = {
  cards: PropTypes.objectOf(PropTypes.arrayOf(Card)).isRequired,
  currentPlayer: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  lastPlay: PropTypes.object,
  moves: PropTypes.shape({
    Pass: PropTypes.func,
    MakeMove: PropTypes.func,
  }).isRequired,
  playersIn: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNames: PropTypes.arrayOf(PropTypes.string),
};

PlayerView.defaultProps = {
  playerNames: ['Adri', 'Binh', 'Chris', 'Drake'],
  lastPlay: null,
};

export default PlayerView;
