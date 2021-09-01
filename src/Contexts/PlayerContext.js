import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';

export const PlayerContext = React.createContext();

const init = (defaults) => {
  try {
    const session = JSON.parse(sessionStorage.getItem('PlayerState'));
    return session.playerName ? session : defaults;
  } catch (e) {
    console.warn(
      'Error thrown collecting previous player state, using defaults'
    );
    return defaults;
  }
};

const reducer = (state, action) => {
  console.log(`dispatch fired: ${JSON.stringify(action, null, 2)}`);

  switch (action.type) {
    case 'set-spectate': {
      const { roomID } = action.payload;

      if (!roomID) {
        console.error('set-spectator called w/out roomID');
        return state;
      }

      return {
        ...state,
        isSpectator: true,
        roomID,
        playerID: null,
        playerToken: null,
      };
    }

    case 'name-player': {
      const { playerName } = action.payload;

      return {
        ...state,
        playerName,
      };
    }

    // shouldn't exist. should control page view via PageContext
    case 'set-room': {
      const { roomID } = action.payload;

      if (!roomID) {
        console.error('set-room called w/out roomID');
        return state;
      }

      return {
        ...state,
        roomID,
      };
    }

    case 'set-player': {
      const { roomID, playerID, playerToken } = action.payload;

      if (!roomID || !playerToken) {
        console.error('set-player called w/out playerToken/roomID');
        return state;
      }

      return {
        ...state,
        isSpectator: false,
        roomID,
        playerID,
        playerToken,
      };
    }

    case 'eject-player': {
      return {
        ...state,
        isSpectator: false,
        roomID: false,
        playerID: null,
        playerToken: null,
      };
    }

    default:
      console.warn(`invalid action type called: ${action.type}`);
      return state;
  }
};

export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    {
      playerName: '',
      isSpectator: false,
      roomID: null,

      playerID: null,
      playerToken: null,
    },
    init
  );

  React.useEffect(() => {
    sessionStorage.setItem('PlayerState', JSON.stringify(state));
  }, [state]);

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default PlayerContext;
