import axios from 'axios';
import keys from '../keys';

const instance = axios.create({
  baseURL: keys.serverUri,
});

const ServerClient = {
  getGames: async () => {
    const response = await instance.get('/games');
    return response;
  },
};

export default ServerClient;
