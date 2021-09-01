import React from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, Form, Radio, Spin, Row, Col, message } from 'antd';
import { LobbyClient } from '../../Http';
import LobbyRoomList from './lobbyRoomList';
import Foyer from '../Foyer';
import PlayerContext from '../../Contexts/PlayerContext';

function Lobby(props) {
  const { logOut } = props;
  const {
    playerName,
    playerToken,
    playerID,
    roomID,

    dispatch,
  } = React.useContext(PlayerContext);

  const [isCreating, updateIsCreating] = React.useState(false);
  const [isJoining, updateIsJoining] = React.useState(false);

  // Create Room Drawer
  const [showCreateRoom, updateShowCreateRoom] = React.useState(false);
  const [numPlayers, updateNumPlayers] = React.useState(4);

  if (!playerName) {
    logOut();
  }

  const joinRoom = async (id) => {
    updateIsJoining(true);

    if (!playerToken || !playerID) {
      // if no association existed, attempt to join the room
      const playerDetails = await LobbyClient.joinRoom({
        roomID: id,
        playerName,
      });

      if (!playerDetails) {
        message.error("Couldn't join room");
      } else {
        dispatch({
          type: 'set-player',
          payload: {
            roomID: id,
            ...playerDetails,
          },
        });
      }
    } else {
      // if the already have credentials, just re-enter the room
      dispatch({
        type: 'set-room',
        payload: {
          roomID: id,
        },
      });
    }

    updateIsJoining(false);
  };

  // show loading spinner while trying to join a game
  if (isJoining) {
    return (
      <Row align="middle" justify="center">
        <Spin />
      </Row>
    );
  }

  const createRoom = async () => {
    updateIsCreating(true);
    updateShowCreateRoom(false);
    joinRoom(await LobbyClient.createRoom({ numPlayers }));
    updateIsCreating(false);
  };

  const spectateRoom = async (id) => {
    dispatch({ type: 'set-spectate', payload: { roomID: id } });
  };

  // TODO: exiting foyer shouldn't erase creds
  //  this will only result in duplicate players
  //  should maintain PageContext uncoupled from PlayerContext
  const exitFoyer = async (id) => {
    await LobbyClient.leaveRoom({ roomID, playerToken, playerID });
    dispatch({ type: 'eject-player' });
  };

  const playAgain = async () => {
    updateIsCreating(true);
    if (!playerID || !playerToken) {
      message.error("Couldn't create a duplicate room");
      dispatch({ type: 'eject-player' });
    } else {
      joinRoom(await LobbyClient.playAgain({ roomID, playerToken, playerID }));
    }

    updateIsCreating(false);
  };

  if (roomID) {
    return <Foyer playAgain={playAgain} exitFoyer={exitFoyer} />;
  }

  return (
    <>
      <Row align="top" justify="center" style={{ padding: 10 }}>
        <Button
          type="primary"
          loading={isCreating}
          onClick={() => updateShowCreateRoom(true)}
        >
          Create Room
        </Button>
      </Row>
      <Col offset={1} span={22}>
        <LobbyRoomList onJoin={joinRoom} onSpectate={spectateRoom} />
      </Col>
      <Drawer
        title="Room Settings"
        placement="bottom"
        closable={false}
        onClose={() => updateShowCreateRoom(false)}
        visible={showCreateRoom}
      >
        <Form onFinish={() => createRoom()}>
          <Form.Item label="Players">
            <Radio.Group
              onChange={(e) => updateNumPlayers(e.target.value)}
              value={numPlayers}
            >
              <Radio.Button value={2}>2</Radio.Button>
              <Radio.Button value={3}>3</Radio.Button>
              <Radio.Button value={4}>4</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

Lobby.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default Lobby;
