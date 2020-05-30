import React from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Space, Popconfirm, Row } from 'antd';
import Hand from './hand';
import Card from '../Card';
import PlayerOptions from './playerOptions';

function PlayerView(props) {
  const {
    cards,
    currentPlayer,
    playersIn,
    isActive,
    moves,
    playerNames,
  } = props;
  const [selected, updateSelected] = React.useState([]);

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

  const statusBar = (
    <Space>
      <div>
        In: {playersIn.map((id) => playerNames[parseInt(id, 10)]).join(', ')}
      </div>
      <div>Waiting on {playerNames[parseInt(currentPlayer, 10)]}</div>
    </Space>
  );
  const cardPlaceholder = <div style={{ minHeight: 130 }} />;

  // TODO: break into smaller components
  return (
    <>
      {isActive && (
        <Row align="center">
          <Hand cards={cards.filter((_, idx) => selected.includes(idx))} />
        </Row>
      )}
      {isActive || cardPlaceholder}
      {isActive && (
        <Row align="center">
          <PlayerOptions
            selected={selected}
            playMove={playMove}
            pass={() => moves.Pass()}
            clear={clear}
          />
        </Row>
      )}
      <Divider style={{ margin: '10px 0' }} />
      <Row align="center">
        <Hand cards={cards} isActive={isActive} onSelect={selectCard} />
      </Row>
    </>
  );
}

PlayerView.propTypes = {
  cards: PropTypes.arrayOf(Card).isRequired,
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
