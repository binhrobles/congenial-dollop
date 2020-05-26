import React from 'react';
import keys from './keys';
import Debug from './Screen/debug';
import Landing from './Screen/landing';

function App() {
  if (keys.debug) {
    return <Debug />;
  }
  return <Landing />;
}

export default App;
