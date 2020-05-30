import React from 'react';
import PropTypes from 'prop-types';
import { List, Space } from 'antd';
import Avatar from './avatar';
import LobbyClient from '../Http/lobby';
import useInterval from '../hooks/useInterval';

function FoyerBuddies(props) {
  const { roomID, notifyReady } = props;
  const [buddies, updateBuddies] = React.useState([]);
  const [isLoading, updateIsLoading] = React.useState(true);

  useInterval(() => {
    let isMounted = true;
    (async () => {
      // don't update the component's state if the
      // component is no longer mounted, indicated
      // by the clean up func having been called
      const b = await LobbyClient.getBuddies({ roomID });
      if (isMounted) {
        updateBuddies(b);
        updateIsLoading(false);

        const openSeats = b.filter((p) => !('name' in p));
        if (openSeats.length === 0) {
          notifyReady(true);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, 2000);

  return (
    <List
      grid={{ gutter: 8 }}
      loading={isLoading}
      dataSource={buddies}
      renderItem={(bud) => {
        if (bud.name) {
          return <Avatar playerName={bud.name} withName />;
        }
      }}
    />
  );
}

FoyerBuddies.propTypes = {
  roomID: PropTypes.string.isRequired,
  notifyReady: PropTypes.func.isRequired,
};

export default FoyerBuddies;
