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
    // show lobby
  }

  const createRoom = () => {
    updateIsCreating(true);
    // TODO: create our room
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
      <Col offset={2} span={20}>
        <List
          style={{
            overflow: 'auto',
            width: '100%',
          }}
          itemLayout="horizontal"
          dataSource={rooms}
          renderItem={(room) => <LobbyRoomInstance room={room} />}
        />
      </Col>
    </>
  );
}

Lobby.propTypes = {
  playerName: PropTypes.string.isRequired,
};

export default Lobby;
