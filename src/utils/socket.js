import io from 'socket.io-client';

let socket;

export const getSocket = (userId) => {
  if (!socket) {
    socket = io("https://api.ballog.store/", {
      query: { user_id: userId }
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  return socket;
};