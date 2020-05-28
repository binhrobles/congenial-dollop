import React from 'react';
import { Layout } from 'antd';
import keys from './keys';
import Debug from './Screen/debug';
import Landing from './Screen/landing';

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
      <Layout.Footer style={{ textAlign: 'center' }}>
        Tassajara Studios ©2015
      </Layout.Footer>
    </Layout>
  );
}

export default App;
