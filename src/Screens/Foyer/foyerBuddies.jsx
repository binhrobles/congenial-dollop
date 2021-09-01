import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { Avatar } from '../../Components';
import { LobbyClient } from '../../Http';
import useInterval from '../../hooks/useInterval';
import PlayerContext from '../../Contexts/PlayerContext';

function FoyerBuddies(props) {
  const { notifyReady } = props;
  const { roomID } = React.useContext(PlayerContext);

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
  notifyReady: PropTypes.func.isRequired,
};

export default FoyerBuddies;
