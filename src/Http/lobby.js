import axios from 'axios';
import keys from '../keys';

const instance = axios.create({
  baseURL: keys.serverUri,
});

function handleError(e) {
  const { response } = e;
  const { request, ...errorObj } = response;
  console.log(errorObj);
}

const LobbyClient = {
  // body {
  //  numPlayers (required): the number of players.
  //  setupData  (optional): custom object that is passed to the game setup function.
  // }
  createRoom: async (body) => {
    try {
      const response = await instance.post('/games/thirteen/create', body);
      return response.data.gameID;
    } catch (e) {
      handleError(e);
      return null;
    }
  },

  getRooms: async () => {
    try {
      const response = await instance.get('/games/thirteen');
      return response.data.rooms;
    } catch (e) {
      handleError(e);
      return [];
    }
  },
};

export default LobbyClient;
