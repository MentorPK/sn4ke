import './style.css';
import initializeWebSocket from '../../functions/initializeWebSocket';
import Board from '../../components/Board';
import Food from '../../components/Food';
import SnakeOne from '../../components/SnakeOne';
import Options from '../../components/Options';
import { isGameOver, activePlayerTwo } from '../../signals/globalSignals';
import SnakeTwo from '../../components/SnakeTwo';
import { signal } from '@preact/signals';
import ReconnectingWebSocket from 'reconnecting-websocket';

export const Home = () => {
  // Create a signal for the WebSocket
  const socket = signal<ReconnectingWebSocket | null>(null);
  socket.value = initializeWebSocket();

  const sendMessage = () => {
    const message = 'This is a message from Client to Server';
    socket.value.send(message);
  };

  sendMessage();

  return (
    <div style={{ display: 'flex', gap: '100px' }}>
      <Board>
        {isGameOver.value ? (
          <h1>Game Over</h1>
        ) : (
          <>
            <SnakeOne />
            <Food />
            {activePlayerTwo.value && <SnakeTwo />}
          </>
        )}
      </Board>
      <Options />
    </div>
  );
};
