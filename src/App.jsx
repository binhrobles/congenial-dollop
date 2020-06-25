import React from 'react';
import { Button, Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import keys from './keys';
import Debug from './Screens/Debug';
import Landing from './Screens/Landing';

function App() {
  const [hasEntered, updateHasEntered] = React.useState(false);

  if (keys.debug) {
    return <Debug />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header>
        <h1 style={{ textAlign: 'center', color: '#f0f2f5' }}>Thirteen</h1>
      </Layout.Header>
      <Layout.Content>
        <Landing hasEntered={hasEntered} updateHasEntered={updateHasEntered} />
      </Layout.Content>
      {hasEntered || (
        <Layout.Footer style={{ textAlign: 'center' }}>
          <Button
            shape="circle"
            icon={<GithubOutlined />}
            href="https://github.com/binhrobles/thirteen"
          />
        </Layout.Footer>
      )}
    </Layout>
  );
}

export default App;
