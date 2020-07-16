import React from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Input } from 'antd';
import Avatar from '../../Components/avatar';
import Lobby from '../Lobby';
import { LobbyClient } from '../../Http';
import useStateWithSessionStorage from '../../hooks/useStateWithSessionStorage';

const MAX_NAME_LENGTH = 10;

function Landing({ hasEntered, updateHasEntered }) {
  const [playerName, updatePlayerName] = useStateWithSessionStorage(
    'playerName'
  );

  React.useEffect(() => {
    // wake up Heroku app
    LobbyClient.ping();
  }, []);

  const onClick = () => {
    updateHasEntered(true);
  };

  const logOut = () => {
    updatePlayerName('');
    updateHasEntered(false);
  };

  if (hasEntered) {
    return <Lobby playerName={playerName} logOut={logOut} />;
  }

  return (
    <>
      <div style={{ textAlign: 'center', width: '100vw' }}>
        <div>
          <Avatar
            playerName={playerName}
            style={{
              padding: 10,
              width: 'unset',
              height: 'unset',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }}
          />
        </div>
        <Space>
          <Input
            size="large"
            placeholder="Who are you?"
            value={playerName}
            onChange={(event) =>
              updatePlayerName(event.target.value.slice(0, MAX_NAME_LENGTH))
            }
          />
          <Button type="primary" size="large" onClick={onClick}>
            Enter
          </Button>
        </Space>
      </div>
    </>
  );
}

Landing.propTypes = {
  hasEntered: PropTypes.bool.isRequired,
  updateHasEntered: PropTypes.func.isRequired,
};

export default Landing;
