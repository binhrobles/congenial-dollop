import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.adorable.io',
});

function handleError(e) {
  const { response } = e;
  const { request, ...errorObj } = response;
  console.error(errorObj);
}

const AvatarClient = {
  getAvatarForPlayer: async (name) => {
    try {
      return await instance.get(`/avatars/100/${name}.png`).data;
    } catch (e) {
      handleError(e);
      return null;
    }
  },
};

export default AvatarClient;
