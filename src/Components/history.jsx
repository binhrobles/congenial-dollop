import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import Play from '../Play';
import Hand from './hand';
import './index.css';

const History = (props) => {
  const { log } = props;

  // set max and min height to same x% of screen
  return (
    <List
      dataSource={log}
      itemLayout="vertical"
      renderItem={(play) => (
        <List.Item key={play.value}>
          Player {play.player}
          <Hand cards={play.cards} />
        </List.Item>
      )}
    />
  );
};

History.propTypes = {
  log: PropTypes.arrayOf(Play).isRequired,
};

export default History;
