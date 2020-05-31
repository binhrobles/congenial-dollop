import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';

const description = (room) => {
  const waiting = room.players.filter((x) => 'name' in x);
  const total = room.players.length;

  if (waiting.length !== 0) {
    return `${waiting.length} of ${total}`;
  }

  return 'Empty Room';
};

function LobbyRoomInstance(props) {
  const { room, onJoin } = props;

  return (
    <List.Item>
      <List.Item.Meta
        title={`Room ID: ${room.gameID}`}
        description={description(room)}
      />
      <Button type="primary" onClick={() => onJoin(room.gameID)}>
        Join
      </Button>
    </List.Item>
  );
}

LobbyRoomInstance.propTypes = {
  room: PropTypes.shape({
    gameID: PropTypes.string,
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    setupData: PropTypes.object,
  }).isRequired,
  onJoin: PropTypes.func.isRequired,
};

export default LobbyRoomInstance;
