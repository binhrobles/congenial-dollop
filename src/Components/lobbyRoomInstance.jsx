import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';

function LobbyRoomInstance(props) {
  const { room, onJoin } = props;
  const playersIn = room.players.filter((x) => 'name' in x);

  const description = () => {
    if (playersIn.length !== 0) {
      return `Players waiting: ${playersIn.map((p) => p.name).join(', ')}`;
    }

    return 'Empty Room';
  };

  return (
    <List.Item>
      <List.Item.Meta
        title={`Room ID: ${room.gameID}`}
        description={description()}
      />
      <Button
        type="primary"
        disabled={playersIn.length === 4}
        onClick={() => onJoin(room.gameID)}
      >
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
