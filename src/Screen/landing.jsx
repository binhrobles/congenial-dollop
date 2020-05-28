import React from 'react';
import { Button, Space, Input } from 'antd';
import Lobby from './lobby';
import useStateWithLocalStorage from '../hooks/useStateWithLocalStorage';

function Landing() {
  const [playerName, updatePlayerName] = useStateWithLocalStorage('playerName');
  const [hasEntered, updateHasEntered] = React.useState(playerName !== null);

  if (hasEntered) {
    return <Lobby playerName={playerName} />;
  }

  const handleSubmit = () => {
    updateHasEntered(true);
  };

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
