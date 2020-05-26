import React from 'react';
import { Button, PageHeader, Space, Input } from 'antd';
import LobbyClient from '../Http/lobby';

function Landing() {
  const [playerName, updatePlayerName] = React.useState(null);
  const [isLoading, updateIsLoading] = React.useState(false);
  const [playerID, updatePlayerID] = React.useState(null);

  if (playerID !== null) {
    // show lobby
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateIsLoading(true);
    const games = await LobbyClient.getGames();
    alert(games);
    updateIsLoading(false);
  };

  return (
    <PageHeader title="Thirty Shitteen">
      <form onSubmit={handleSubmit}>
        <Space>
          <Input
            size="large"
            placeholder="Who are you?"
            value={playerName}
            onChange={(event) => updatePlayerName(event.target.value)}
          />
          <Button type="primary" loading={isLoading} htmlType="submit">
            Enter
          </Button>
        </Space>
      </form>
    </PageHeader>
  );
}

export default Landing;
