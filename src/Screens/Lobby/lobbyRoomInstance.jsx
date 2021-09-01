import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';

const description = (room) => {
  const waiting = room.players.filter((x) => 'name' in x);
  const total = room.players.length;

  return `${waiting.length} of ${total}`;
};

function LobbyRoomInstance(props) {
  const { room, onJoin, onSpectate } = props;

  return (
    <List.Item>
      <List.Item.Meta
        title={`Room ID: ${room.matchID.slice(0, 4)}`}
        description={description(room)}
      />
      <Button onClick={() => onSpectate(room.matchID)}>Spectate</Button>
      <Button type="primary" onClick={() => onJoin(room.matchID)}>
        Join
      </Button>
    </List.Item>
  );
}

LobbyRoomInstance.propTypes = {
  room: PropTypes.shape({
    matchID: PropTypes.string,
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    setupData: PropTypes.object,
  }).isRequired,
  onJoin: PropTypes.func.isRequired,
  onSpectate: PropTypes.func.isRequired,
};

export default LobbyRoomInstance;
