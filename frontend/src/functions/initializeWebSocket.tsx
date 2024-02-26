import ReconnectingWebSocket from 'reconnecting-websocket';

const initializeWebSocket = () => {
  const newSocket = new ReconnectingWebSocket('ws://localhost:8080/ws');

  newSocket.addEventListener('open', () => {
    console.log('Connection established');
  });

  newSocket.addEventListener('message', (event) => {
    console.log('Received message from backend:', event.data);
  });

  newSocket.addEventListener('close', () => {
    console.log('Connection closed');
  });

  newSocket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
  });

  return newSocket;
};

export default initializeWebSocket;
