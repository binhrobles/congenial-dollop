import React from 'react';
import PropTypes from 'prop-types';
import { Button, List, Row, Col } from 'antd';
import LobbyClient from '../Http/lobby';
import LobbyRoomInstance from '../Components/lobbyRoomInstance';

function Lobby(props) {
  const { playerName } = props;
  const [isCreating, updateIsCreating] = React.useState(false);
  const [rooms, updateRooms] = React.useState([]);
  const [roomID, updateRoomID] = React.useState(null);

  if (roomID) {
    // show waiting room
    console.log(roomID);
  }

  const createRoom = async () => {
    updateIsCreating(true);
    updateRoomID(await LobbyClient.createRoom({ numPlayers: 4 }));
    updateIsCreating(false);
  };

  React.useEffect(() => {
    (async () => {
      updateRooms(await LobbyClient.getRooms());
    })();
  });

  return (
    <>
      <Row align="top" justify="center" style={{ padding: 10 }}>
        <Button type="primary" loading={isCreating} onClick={createRoom}>
          Create Room
        </Button>
      </Row>
      <Col offset={1} span={22}>
        <List
          style={{
            overflow: 'auto',
            maxHeight: '65vh',
          }}
          itemLayout="horizontal"
          bordered
          rowKey={(room) => room.gameID}
          dataSource={rooms}
          renderItem={(room) => (
            <LobbyRoomInstance room={room} onJoin={updateRoomID} />
          )}
        />
      </Col>
    </>
  );
}

Lobby.propTypes = {
  playerName: PropTypes.string.isRequired,
};

export default Lobby;
