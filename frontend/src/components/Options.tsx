import { computed } from '@preact/signals';
import {
  speed,
  snakeSegmentsOne,
  snakeBellyOne,
  wallHack,
  activePlayerTwo,
  startGame,
} from '../signals/globalSignals';
import Code from './Code';
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
        <Code obj={{ startGame }} />
      </div>
      <div>
        <button onClick={() => (activePlayerTwo.value = true)}>
          Activate Player 2 (PC)
        </button>
        <Code obj={{ activePlayerTwo }} />
      </div>
      <h2>Points</h2>
      <div>{points}</div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>
            <button onClick={() => setSpeed(500)}>Slow</button>
          </div>
          <div>
            <button onClick={() => setSpeed(250)}>Normal</button>
          </div>
          <div>
            <button onClick={() => setSpeed(100)}>Fast</button>
          </div>
          <div>
            <button onClick={() => setSpeed(50)}>Very Fast</button>
          </div>
          <div>
            <button onClick={() => setSpeed(25)}>Speed of Light</button>
          </div>
        </div>
        <Code obj={{ speed }} />
      </div>
      <br />
      <div>
        <button onClick={() => (wallHack.value = !wallHack.value)}>
          Toggle Wallhack
        </button>
        <Code obj={{ wallHack }} />
      </div>
      <div>
        <button
          onClick={() => (activePlayerTwo.value = !activePlayerTwo.value)}
        >
          Toggle SecondPlayer
        </button>
        <Code obj={{ activePlayerTwo }} />
      </div>
    </div>
  );
};

export default Options;
