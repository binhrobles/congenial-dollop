import { createContext, useState } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState('');
  const [isSpectator, setIsSpectator] = useState(false);

  const [playerID, setPlayerID] = useState(null);
  const [roomID, setRoomID] = useState(null);
  const [credentials, setCredentials] = useState(null);

  const setSpectator = () => {
    setIsSpectator(true);
    setPlayerID(null);
    setRoomID(null);
    setCredentials(null);
  };

  const setPlayer = ({ playerID, roomID, credentials }) => {
    setIsSpectator(false);
    setPlayerID(playerID);
    setRoomID(roomID);
    setCredentials(credentials);
  };

  return (
    <PlayerContext.Provider
      value={{
        playerName,
        setPlayerName,

        setSpectator,
        setPlayer,

        isSpectator,
        playerID,
        roomID,
        credentials,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

SupplierProvider.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default PlayerContext;
