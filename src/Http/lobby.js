// https://boardgame.io/documentation/#/api/Lobby

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
  createRoom: async ({ numPlayers, setupData }) => {
    try {
      const response = await instance.post('/games/thirteen/create', {
        numPlayers,
        setupData,
      });
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

  joinRoom: async ({ roomID, playerName, data }) => {
    try {
      // find first seat at table with no one in it
      const room = await instance.get(`/games/thirteen/${roomID}`);
      const openSeats = room.data.players.filter((p) => !('name' in p));

      if (openSeats.length === 0) return null;

      const firstOpenSeat = openSeats[0].id;

      const join = await instance.post(`/games/thirteen/${roomID}/join`, {
        playerID: firstOpenSeat,
        playerName,
        data,
      });
      return join.data.playerCredentials;
    } catch (e) {
      handleError(e);
      return null;
    }
  },
};

export default LobbyClient;
