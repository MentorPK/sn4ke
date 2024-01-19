import { computed } from '@preact/signals';
import {
  speed,
  snakeSegmentsOne,
  snakeBellyOne,
  wallHack,
  togglePlayerTwo,
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
          onClick={() => (togglePlayerTwo.value = !togglePlayerTwo.value)}
        >
          Toggle SecondPlayer
        </button>
      </div>
    </div>
  );
};

export default Options;
