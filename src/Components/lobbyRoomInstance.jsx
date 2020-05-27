import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';

function LobbyRoomInstance(props) {
  const { room } = props;

  const description = (players) => {
    const playersIn = players.filter((x) => 'name' in x);
    if (playersIn.length !== 0) {
      return `Players waiting: ${playersIn.map((p) => p.name).join(', ')}`;
    }

    return 'Empty Room';
  };

  return (
    <List.Item key={room.gameID}>
      <List.Item.Meta
        title={`Room ID: ${room.gameID}`}
        description={description(room.players)}
      />
      <Button type="primary">Join</Button>
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
};

export default LobbyRoomInstance;
