import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spin, Row, Col, message } from 'antd';
import LobbyClient from '../Http/lobby';
import LobbyRoomList from '../Components/lobbyRoomList';
import Foyer from './foyer';

// TODO: probably want to use reducer here
function Lobby(props) {
  const { playerName } = props;
  const [isCreating, updateIsCreating] = React.useState(false);
  const [isJoining, updateIsJoining] = React.useState(false);
  const [roomID, updateRoomID] = React.useState(null);
  const [player, updatePlayer] = React.useState(null);

  if (roomID) {
    return <Foyer roomID={roomID} player={player} />;
  }

  const joinRoom = async (id) => {
    updateIsJoining(true);
    // check session storage for pre-existing association
    let playerDetails = JSON.parse(sessionStorage.getItem(id));

    if (!playerDetails) {
      // if no association existed, attempt to join the rrom
      playerDetails = await LobbyClient.joinRoom({
        roomID: id,
        playerName,
      });

      // store room-player association in browser session
      sessionStorage.setItem(id, JSON.stringify(playerDetails));
    }

    if (playerDetails) {
      updatePlayer(playerDetails);
      updateRoomID(id);
    } else {
      message.error('Unable to join room');
    }

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
