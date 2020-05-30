import React from 'react';
import PropTypes from 'prop-types';
import { List, Space } from 'antd';
import Play from '../Play';
import Card from '../Card';
import Hand from './hand';
import Avatar from './avatar';

function History(props) {
  const { log, playerNames } = props;

  // auto scroll to list footer, whenever there's a new log item
  const bottomRef = React.useRef(null);
  React.useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [log]);

  const getPlayerName = (playerID) => {
    return playerNames[parseInt(playerID, 10)];
  };

  const renderLogItem = (entry) => {
    switch (entry.event) {
      case 'move':
        return <Hand cards={entry.play.cards.sort(Card.Compare)} />;
      case 'pass':
        return <div>Passed</div>;
      case 'power':
        return <>has power</>;
      case 'win':
        return <>is out! 🎇</>;
      default:
        return <></>;
    }
  };

  const renderItem = (entry) => (
    <List.Item style={{ justifyContent: 'center' }}>
      <Space
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          maxWidth: '100vw',
        }}
      >
        <Avatar
          playerName={getPlayerName(entry.player)}
          style={{
            borderRadius: '30%',
            width: 70,
            height: 70,
          }}
        />
        {renderLogItem(entry)}
      </Space>
    </List.Item>
  );

  return (
    <List
      style={{
        textAlign: 'center',
        maxHeight: '50vh',
        overflow: 'auto',
        width: '100%',
      }}
      dataSource={log}
      footer={<div ref={bottomRef} />}
      renderItem={renderItem}
    />
  );
}

History.propTypes = {
  log: PropTypes.arrayOf(Play).isRequired,
  playerNames: PropTypes.arrayOf(PropTypes.string),
};

History.defaultProps = {
  playerNames: ['Adri', 'Binh', 'Chris', 'Drake'],
};

export default History;
