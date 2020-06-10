import React from 'react';
import PropTypes from 'prop-types';
import { INVALID_MOVE } from 'boardgame.io/core';
import { Button, Space, Popconfirm, message } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import Card from '../../Game/Card';
import Play, { COMBO, isSuited } from '../../Game/Play';
import { tryStandardMove, tryOpeningMove } from '../../Game/Move/makeMove';

function PlayerOptions(props) {
  const { selected, lastPlay, moves, updateSelected, playerID } = props;
  const [shouldSuitedPrompt, showSuitedPrompt] = React.useState(false);
  let attemptedPlay;

  function clear() {
    attemptedPlay = null;
    showSuitedPrompt(false);
    updateSelected([]);
  }

  function executeMove() {
    try {
      moves.MakeMove(attemptedPlay);
    } catch (_) {
      message.error('There was a problem playing your hand');
    } finally {
      clear();
    }
  }

  function markSuited() {
    attemptedPlay.suited = true;
    executeMove();
  }

  function onPlayClicked() {
    // ensure we're not dropping in duplicate cards somehow
    const selectionSet = new Set(selected);
    if (selected.length !== selectionSet.size) {
      message.error("You can't do that");
      clear();
      return;
    }

    // first dry run the move for validation
    const isOpeningMove = !lastPlay;
    try {
      const tryPlay = isOpeningMove
        ? tryOpeningMove(selected)
        : tryStandardMove(lastPlay, selected);
      attemptedPlay = { ...tryPlay, player: playerID };
    } catch (e) {
      message.error(e.message);
      return;
    }

    if (attemptedPlay === INVALID_MOVE) {
      showSuitedPrompt(false);
      message.error("You can't do that");
      return;
    }

    if (
      isOpeningMove &&
      attemptedPlay.combo === COMBO.RUN &&
      isSuited(selected)
    ) {
      showSuitedPrompt(true);
      return;
    }

    executeMove();
  }

  if (selected.length > 0) {
    return (
      <Space>
        <Button type="default" onClick={clear}>
          Clear
        </Button>
        <Popconfirm
          title="Play this as a suited straight?"
          visible={shouldSuitedPrompt}
          onVisibleChange={onPlayClicked}
          okText="Yes"
          onConfirm={markSuited}
          cancelText="No"
          onCancel={executeMove}
          icon={<MehOutlined />}
        >
          <Button type="primary">Play it!</Button>
        </Popconfirm>
      </Space>
    );
  }

  if (lastPlay) {
    return (
      <Popconfirm
        title="Really?"
        okText="Really."
        cancelText="No"
        onConfirm={() => moves.Pass()}
      >
        <Button type="default">Pass</Button>
      </Popconfirm>
    );
  }

  return <></>;
}

PlayerOptions.propTypes = {
  lastPlay: PropTypes.instanceOf(Play),
  selected: PropTypes.arrayOf(Card).isRequired,
  moves: PropTypes.shape({
    Pass: PropTypes.func,
    MakeMove: PropTypes.func,
  }).isRequired,
  updateSelected: PropTypes.func.isRequired,
  playerID: PropTypes.number.isRequired,
};

PlayerOptions.defaultProps = {
  lastPlay: null,
};

export default PlayerOptions;
