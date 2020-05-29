import React from 'react';
import { Button, Space, Input } from 'antd';
import Lobby from './lobby';
import LobbyClient from '../Http/lobby';
import useStateWithSessionStorage from '../hooks/useStateWithSessionStorage';

function Landing() {
  const [playerName, updatePlayerName] = useStateWithSessionStorage(
    'playerName'
  );
  const [hasEntered, updateHasEntered] = React.useState(playerName !== '');

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
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', padding: 10 }}>
      <Space>
        <Input
          size="large"
          placeholder="Who are you?"
          value={playerName}
          onChange={(event) => updatePlayerName(event.target.value)}
        />
        <Button type="primary" htmlType="submit">
          Enter
        </Button>
      </Space>
    </form>
  );
}

export default Landing;
