import React from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Popconfirm } from 'antd';
import Card from '../Card';
import Play from '../Play';

function PlayerOptions(props) {
  const { selected, lastPlay, playMove, pass, clear } = props;

  if (selected.length > 0) {
    return (
      <Space>
        <Button type="primary" onClick={playMove}>
          Play it!
        </Button>
        <Button type="default" onClick={clear}>
          Clear
        </Button>
      </Space>
    );
  }

  if (lastPlay) {
    return (
      <Popconfirm
        title="Really?"
        okText="Really."
        cancelText="No"
        onConfirm={pass}
      >
        <Button type="default">Pass</Button>
      </Popconfirm>
    );
  }

  return <></>;
}

PlayerOptions.propTypes = {
  clear: PropTypes.func.isRequired,
  lastPlay: PropTypes.instanceOf(Play).isRequired,
  pass: PropTypes.func.isRequired,
  playMove: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(Card).isRequired,
};

export default PlayerOptions;
