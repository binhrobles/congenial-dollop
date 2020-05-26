import React from 'react';
import PropTypes from 'prop-types';
import { List, Space } from 'antd';
import Play from '../Play';
import Hand from './hand';
import './index.css';

const History = (props) => {
  const { log } = props;

  const label = (player) => `Player ${player}`;

  // set max and min height to same x% of screen
  return (
    <List
      style={{ textAlign: 'center' }}
      dataSource={log}
      itemLayout="vertical"
      renderItem={(play) => (
        <List.Item key={play.value}>
          <Space>
            {label(play.player)}
            <Hand cards={play.cards} />
          </Space>
        </List.Item>
      )}
    />
  );
};

History.propTypes = {
  log: PropTypes.arrayOf(Play).isRequired,
};

export default History;
