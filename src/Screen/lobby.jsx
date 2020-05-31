import React from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, Form, Radio, Spin, Row, Col, message } from 'antd';
import LobbyClient from '../Http/lobby';
import LobbyRoomList from '../Components/lobbyRoomList';
import Foyer from './foyer';
import useStateWithSessionStorage from '../hooks/useStateWithSessionStorage';

// TODO: probably want to use reducer here
function Lobby(props) {
  const { playerName, logOut } = props;
  const [roomID, updateRoomID] = useStateWithSessionStorage('roomID');
  const [isCreating, updateIsCreating] = React.useState(false);
  const [isJoining, updateIsJoining] = React.useState(false);

  // Create Room Drawer
  const [showCreateRoom, updateShowCreateRoom] = React.useState(false);
  const [numPlayers, updateNumPlayers] = React.useState(4);

  if (!playerName) {
    logOut();
  }

  // TODO: break into reducer that can be reused b/w here and results page?
  // ties together `updateLoading` and `updateRoomID`
  // useEffect doing most of this, on `roomID` change
  //    -> will need to null check on first run
  const joinRoom = async (id) => {
    updateIsJoining(true);
    // check session storage for pre-existing association
    let playerDetails = JSON.parse(sessionStorage.getItem(id));

    if (!playerDetails) {
      // if no association existed, attempt to join the room
      playerDetails = await LobbyClient.joinRoom({
        roomID: id,
        playerName,
      });

      // store room-player association in browser session
      sessionStorage.setItem(id, JSON.stringify(playerDetails));
    }

    if (playerDetails) {
      updateRoomID(id);
    } else {
      message.error('Unable to join room');
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

  const exitFoyer = () => {
    updateRoomID('');
  };

  if (roomID) {
    return (
      <Foyer
        roomID={roomID}
        player={JSON.parse(sessionStorage.getItem(roomID))}
        exitFoyer={exitFoyer}
      />
    );
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
        <LobbyRoomList onJoin={joinRoom} />
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

Lobby.propTypes = {
  playerName: PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default Lobby;
