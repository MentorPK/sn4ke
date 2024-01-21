import { computed } from '@preact/signals';
import {
  speed,
  snakeSegmentsOne,
  snakeBellyOne,
  wallHack,
  activePlayerTwo,
  startGame,
} from '../signals/globalSignals';
const Options = () => {
  const points = computed(() => {
    if (snakeSegmentsOne.value.length === 3) return 0;
    else return snakeSegmentsOne.value.length - 3 + snakeBellyOne.value.length;
  });
  const setSpeed = (value: number) => {
    speed.value = value;
  };

  return (
    <div>
      <h1>Options</h1>
      <div>
        <button onClick={() => (startGame.value = true)}>Start Game</button>
      </div>
      <div>
        <button onClick={() => (activePlayerTwo.value = true)}>
          Activate Player 2 (PC)
        </button>
      </div>
      <h2>Points</h2>
      <div>{points}</div>
      <div>
        <button onClick={() => setSpeed(500)}>Slow</button>
        <button onClick={() => setSpeed(250)}>Normal</button>
        <button onClick={() => setSpeed(100)}>Fast</button>
        <button onClick={() => setSpeed(50)}>Very Fast</button>
        <button onClick={() => setSpeed(25)}>Speed of Light</button>
      </div>
      <div>
        <button onClick={() => (wallHack.value = !wallHack.value)}>
          Toggle Wallhack
        </button>
      </div>
      <div>
        <button
          onClick={() => (activePlayerTwo.value = !activePlayerTwo.value)}
        >
          Toggle SecondPlayer
        </button>
      </div>
    </div>
  );
};

export default Options;
