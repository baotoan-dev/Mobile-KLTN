import { io } from 'socket.io-client';
import * as SecureStore from 'expo-secure-store';
import { CONST_API_V1 } from '../api/contants/urlContant';

const baseSocketUrl = Platform.OS === 'android' ? CONST_API_V1 : 'http://localhost:8888';

const connectToSocket = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');

    if (!token) {
      throw new Error('Token is missing');
    }

    const socketInstance = io(baseSocketUrl, {
      transports: ['websocket'],
      jsonp: false,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return socketInstance;
  } catch (error) {
    console.error('Error retrieving token or connecting to socket:', error);
    throw error;
  }
};

const socket = io(baseSocketUrl, {
  transports: ['websocket'],
  jsonp: false,
});

export { connectToSocket, socket };
