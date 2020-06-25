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

  const handleSubmit = () => {
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
      <form
        onSubmit={handleSubmit}
        style={{ textAlign: 'center', padding: 10 }}
      >
        <Space>
          <Input
            size="large"
            placeholder="Who are you?"
            value={playerName}
            onChange={(event) =>
              updatePlayerName(event.target.value.slice(0, MAX_NAME_LENGTH))
            }
          />
          <Button type="primary" size="large" htmlType="submit">
            Enter
          </Button>
        </Space>
      </form>
    </>
  );
}

Landing.propTypes = {
  hasEntered: PropTypes.bool.isRequired,
  updateHasEntered: PropTypes.func.isRequired,
};

export default Landing;
