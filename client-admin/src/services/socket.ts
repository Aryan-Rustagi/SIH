import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    const rawUrl = (import.meta.env.VITE_API_URL || '').trim();
    const serverOrigin = rawUrl ? rawUrl.replace(/\/api\/?$/, '') : window.location.origin;

    socket = io(serverOrigin, {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
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
