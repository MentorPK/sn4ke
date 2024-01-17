import './style.css';
import initializeWebSocket from '../../functions/initializeWebSocket';
import Board from '../../components/Board';
import Food from '../../components/Food';
import Snake from '../../components/Snake';
import { isGameOver } from '../../signals/globalSignals';
import Options from '../../components/Options';

export const Home = () => {
  // Create a signal for the WebSocket
  //const socket = signal(null);
  //socket.value = initializeWebSocket();

  //const sendMessage = () => {
  //  const message = 'This is a message from Client to Server';
  //  socket.value.send(message);
  //};

  return (
    <div style={{ display: 'flex', gap: '100px' }}>
      <Board>
        {isGameOver.value ? (
          <h1>Game Over</h1>
        ) : (
          <>
            <Snake />
            <Food />
          </>
        )}
      </Board>
      <Options />
    </div>
  );
};
