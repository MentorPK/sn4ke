import ReconnectingWebSocket from "reconnecting-websocket";

const initializeWebSocket = () => {
    const newSocket = new ReconnectingWebSocket('ws://localhost:8080/ws');

    newSocket.addEventListener('open', () => {
        console.log('WebSocket connection opened');
        newSocket.send('Welcome to Preact!');
    });

    newSocket.addEventListener('message', (event) => {
        console.log('Received message:', event.data);
    });

    newSocket.addEventListener('close', () => {
        console.log('WebSocket connection closed');
    });
    return newSocket
};

export default initializeWebSocket