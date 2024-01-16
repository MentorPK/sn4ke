import { signal, useSignal, useSignalEffect } from '@preact/signals';

import './style.css';
import initializeWebSocket from '../../functions/initializeWebSocket';
import Board from '../../components/Board';
import Food from '../../components/Food';
import Snake from '../../components/Snake';
import { isGameOver, snakeHead } from '../../signals/globalSignals';

export const Home = () => {
  // Create a signal for the WebSocket
  const socket = signal(null);
  //socket.value = initializeWebSocket();

  const sendMessage = () => {
    const message = 'This is a message from Client to Server';
    socket.value.send(message);
  };

  return (
    <div>
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
    </div>
  );
};
