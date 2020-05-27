import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import LobbyClient from '../Http/lobby';
import LobbyRoomInstance from './lobbyRoomInstance';
import useInterval from '../useInterval';

function LobbyRoomList(props) {
  const { onJoin } = props;
  const [rooms, updateRooms] = React.useState([]);

  useInterval(() => {
    let isMounted = true;
    (async () => {
      // don't update the component's state if the
      // component is no longer mounted, indicated
      // by the clean up func having been called
      const r = await LobbyClient.getRooms();
      if (isMounted) updateRooms(r);
    })();
    return () => {
      isMounted = false;
    };
  }, 2000);

  return (
    <List
      style={{
        overflow: 'auto',
        maxHeight: '65vh',
      }}
      itemLayout="horizontal"
      bordered
      rowKey={(room) => room.gameID}
      dataSource={rooms}
      renderItem={(room) => <LobbyRoomInstance room={room} onJoin={onJoin} />}
    />
  );
}

LobbyRoomList.propTypes = {
  onJoin: PropTypes.func.isRequired,
};

export default LobbyRoomList;
