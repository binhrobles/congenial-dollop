import axios from 'axios';
import keys from '../keys';

const instance = axios.create({
  baseURL: keys.serverUri,
});

const LobbyClient = {
  getRooms: async () => {
    try {
      const response = await instance.get('/games/thirteen');
      return response.data.rooms;
    } catch (e) {
      const { response } = e;
      const { request, ...errorObj } = response;
      console.log(errorObj);
      return [];
    }
  },
};

export default LobbyClient;
