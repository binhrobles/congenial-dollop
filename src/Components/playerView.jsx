import React from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Popconfirm } from 'antd';
import Hand from './hand';
import Card from '../Card';
import './index.css';

function PlayerView(props) {
  const { cards, currentPlayer, isActive, moves } = props;
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

  return (
    <Space direction="vertical" size="large" align="center">
      {/* TODO: Needs to refresh underlying Hand ids when selected changes */}
      {isActive && (
        <Space direction="vertical" align="center">
          <Hand cards={cards.filter((_, idx) => selected.includes(idx))} />
          <Space>
            {selected.length > 0 ? (
              <div>
                <Button type="primary" onClick={playMove}>
                  Play it!
                </Button>
                <Button type="default" onClick={clear}>
                  Clear
                </Button>
              </div>
            ) : (
              <Popconfirm
                title="Really?"
                okText="Really."
                cancelText="No"
                onConfirm={moves.Pass}
              >
                <Button type="default">Pass</Button>
              </Popconfirm>
            )}
          </Space>
        </Space>
      )}
      {isActive || <div>On Player {currentPlayer}</div>}
      <Hand cards={cards} isActive={isActive} onSelect={selectCard} />
    </Space>
  );
}

PlayerView.propTypes = {
  cards: PropTypes.arrayOf(Card).isRequired,
  currentPlayer: PropTypes.string.isRequired,
  moves: PropTypes.shape({
    Pass: PropTypes.func,
    MakeMove: PropTypes.func,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default PlayerView;
