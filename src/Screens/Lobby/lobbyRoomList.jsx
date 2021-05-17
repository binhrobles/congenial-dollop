import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { LobbyClient } from '../../Http';
import LobbyRoomInstance from './lobbyRoomInstance';
import useInterval from '../../hooks/useInterval';

function LobbyRoomList(props) {
  const { onJoin } = props;
  const [rooms, updateRooms] = React.useState([]);
  const [isLoading, updateIsLoading] = React.useState(true);

  useInterval(() => {
    let isMounted = true;
    (async () => {
      // don't update the component's state if the
      // component is no longer mounted, indicated
      // by the clean up func having been called
      const r = await LobbyClient.getRooms();

      if (isMounted) {
        updateRooms(r);
        updateIsLoading(false);
      }
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
      loading={isLoading}
      dataSource={rooms}
      renderItem={(room) => <LobbyRoomInstance room={room} onJoin={onJoin} />}
    />
  );
}

LobbyRoomList.propTypes = {
  onJoin: PropTypes.func.isRequired,
};

export default LobbyRoomList;
