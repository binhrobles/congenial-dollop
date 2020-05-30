import React from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Popconfirm } from 'antd';
import Card from '../Card';

function PlayerOptions(props) {
  const { selected, playMove, pass, clear } = props;

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

PlayerOptions.propTypes = {
  selected: PropTypes.arrayOf(Card).isRequired,
  playMove: PropTypes.func.isRequired,
  pass: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

export default PlayerOptions;
