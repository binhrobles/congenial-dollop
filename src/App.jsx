import React from 'react';
import { Layout } from 'antd';
import keys from './keys';
import Debug from './Screens/Debug';
import Landing from './Screens/Landing';

function App() {
  if (keys.debug) {
    return <Debug />;
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header>
        <h1 style={{ textAlign: 'center', color: '#f0f2f5' }}>
          Thirty Shitteen
        </h1>
      </Layout.Header>
      <Layout.Content>
        <Landing />
      </Layout.Content>
    </Layout>
  );
}

export default App;
