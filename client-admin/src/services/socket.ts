import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(window.location.origin, {
      path: '/socket.io',
      transports: ['websocket'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('[Socket.io] Connected to server:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('[Socket.io] Disconnected from server');
    });
  }

  return socket;
};
