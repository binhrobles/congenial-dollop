import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spin, Row, Col } from 'antd';
import LobbyClient from '../Http/lobby';
import LobbyRoomList from '../Components/lobbyRoomList';
import Foyer from './foyer';

// TODO: probably want to use reducer here
// TODO: caching
function Lobby(props) {
  const { playerName } = props;
  const [isCreating, updateIsCreating] = React.useState(false);
  const [isJoining, updateIsJoining] = React.useState(false);
  const [roomID, updateRoomID] = React.useState(null);
  const [player, updatePlayer] = React.useState({ playerName });

  if (roomID) {
    return <Foyer roomID={roomID} player={player} />;
  }

  const joinRoom = async (id) => {
    updateIsJoining(true);
    // TODO: handle a player rejoining a room, say after a page refresh
    const playerDetails = await LobbyClient.joinRoom({
      roomID: id,
      playerName,
    });
    updatePlayer((p) => ({ ...p, ...playerDetails }));
    updateRoomID(id);
    updateIsJoining(false);
  };

  const createRoom = async () => {
    updateIsCreating(true);
    joinRoom(await LobbyClient.createRoom({ numPlayers: 4 }));
    updateIsCreating(false);
  };

  if (isJoining) {
    return (
      <Row align="middle" justify="center">
        <Spin />
      </Row>
    );
  }

  return (
    <>
      <Row align="top" justify="center" style={{ padding: 10 }}>
        <Button type="primary" loading={isCreating} onClick={createRoom}>
          Create Room
        </Button>
      </Row>
      <Col offset={1} span={22}>
        <LobbyRoomList onJoin={joinRoom} />
      </Col>
    </>
  );
}

Lobby.propTypes = {
  playerName: PropTypes.string.isRequired,
};

export default Lobby;
