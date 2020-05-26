import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { List, Space } from 'antd';
import Play from '../Play';
import Hand from './hand';

const History = (props) => {
  const { log } = props;

  // auto scroll to list footer, whenever there's an update
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const label = (player) => `Player ${player}`;

  return (
    <List
      style={{
        textAlign: 'center',
        maxHeight: '50vh',
        overflow: 'auto',
        width: '100%',
      }}
      dataSource={log}
      itemLayout="vertical"
      footer={<div ref={bottomRef} />}
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
