import React from 'react';
import { Button, Space, Input } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import Avatar from '../Components/avatar';
import Lobby from './lobby';
import LobbyClient from '../Http/lobby';
import useStateWithSessionStorage from '../hooks/useStateWithSessionStorage';

const MAX_NAME_LENGTH = 10;

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
          <Button type="primary" htmlType="submit">
            Enter
          </Button>
        </Space>
      </form>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          padding: 20,
          width: '100vw',
          textAlign: 'center',
        }}
      >
        <Button
          shape="circle"
          icon={<GithubOutlined />}
          href="https://github.com/binhrobles/thirteen"
        />
      </div>
    </>
  );
}

export default Landing;
