import React from 'react';
import PropTypes from 'prop-types';
import { List, Space } from 'antd';
import Play from '../Play';
import Hand from './hand';

// render history just so
const label = (player) => `Player ${player}`;

const renderItem = (play) => (
  <List.Item style={{ justifyContent: 'center' }}>
    <Space>
      {label(play.player)}
      {play.cards.length ? <Hand cards={play.cards} /> : <div>Passed</div>}
    </Space>
  </List.Item>
);

const History = (props) => {
  const { log } = props;

  // auto scroll to list footer, whenever there's a new log item
  const bottomRef = React.useRef(null);
  React.useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  return (
    <List
      style={{
        textAlign: 'center',
        maxHeight: '50vh',
        overflow: 'auto',
        width: '100%',
      }}
      dataSource={log}
      rowKey={(play) => play.value}
      footer={<div ref={bottomRef} />}
      renderItem={renderItem}
    />
  );
};

History.propTypes = {
  log: PropTypes.arrayOf(Play).isRequired,
};

export default History;
