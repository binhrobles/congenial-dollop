// https://boardgame.io/documentation/#/api/Lobby

import axios from 'axios';
import keys from '../keys';

const instance = axios.create({
  baseURL: keys.serverUri,
});

function handleError(e) {
  console.error(JSON.stringify(e, null, 2));
}

async function createRoom({ numPlayers, setupData }) {
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
}

async function getRoomByID(roomID) {
  try {
    const response = await instance.get(`/games/thirteen/${roomID}`);
    return response.data;
  } catch (e) {
    handleError(e);
    return [];
  }
}

async function getBuddies({ roomID }) {
  try {
    const response = await instance.get(`/games/thirteen/${roomID}`);
    return response.data.players;
  } catch (e) {
    handleError(e);
    return [];
  }
}

// only retrieves incomplete games
async function getRooms() {
  try {
    const response = await instance.get('/games/thirteen?isGameover=false');
    return response.data.rooms;
  } catch (e) {
    handleError(e);
    return [];
  }
}

async function joinRoom({ roomID, playerName, data }) {
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
    return {
      playerID: firstOpenSeat,
      playerToken: join.data.playerCredentials,
    };
  } catch (e) {
    handleError(e);
    return null;
  }
}

async function playAgain({ roomID, playerID, playerToken }) {
  try {
    const response = await instance.post(
      `/games/thirteen/${roomID}/playAgain`,
      {
        playerID,
        credentials: playerToken,
      }
    );
    return response.data.nextRoomID;
  } catch (e) {
    handleError(e);
    return null;
  }
}

async function ping() {
  try {
    await instance.get();
  } catch (e) {
    // toss error because there's no root route
    console.log('pinged server');
  }
}

const LobbyClient = {
  createRoom,
  getBuddies,
  getRoomByID,
  getRooms,
  joinRoom,
  ping,
  playAgain,
};

export default LobbyClient;
