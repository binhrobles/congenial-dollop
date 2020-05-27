import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, List } from 'antd';
import LobbyClient from '../Http/lobby';
import useInterval from '../useInterval';

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

function FoyerBuddies(props) {
  const { roomID, notifyReady } = props;
  const [buddies, updateBuddies] = React.useState([]);

  useInterval(() => {
    let isMounted = true;
    (async () => {
      // don't update the component's state if the
      // component is no longer mounted, indicated
      // by the clean up func having been called
      const b = await LobbyClient.getBuddies({ roomID });
      if (isMounted) {
        updateBuddies(b);
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
      grid={{ gutter: 16, column: 4 }}
      dataSource={buddies}
      renderItem={(bud) => {
        if (bud.name) {
          return (
            <Avatar
              size={64}
              style={{
                backgroundColor: ColorList[bud.id],
                verticalAlign: 'middle',
              }}
            >
              {bud.name}
            </Avatar>
          );
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
