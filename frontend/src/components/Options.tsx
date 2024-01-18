import { computed } from '@preact/signals';
import { SignalContext } from '../signals/SignalProvider';
import { useContext } from 'preact/hooks';
const Options = () => {
  const { speed, segments, snakeBelly } = useContext(SignalContext);

  const points = computed(() => {
    if (segments.value.length === 3) return 0;
    else return segments.value.length - 3 + snakeBelly.value.length;
  });
  const setSpeed = (value: number) => {
    speed.value = value;
  };

  return (
    <div>
      <h1>Options</h1>
      <div>
        <button onClick={() => setSpeed(1000)}>Slow</button>
        <button onClick={() => setSpeed(500)}>Normal</button>
        <button onClick={() => setSpeed(250)}>Fast</button>
        <button onClick={() => setSpeed(100)}>Very Fast</button>
        <button onClick={() => setSpeed(50)}>Speed of Light</button>
      </div>
      <h2>Points</h2>
      <div>{points}</div>
    </div>
  );
};

export default Options;
