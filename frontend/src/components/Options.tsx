import { speed } from '../signals/globalSignals';

const Options = () => {
  const setSpeed = (value: number) => {
    speed.value = value;
  };
  return (
    <div>
      <h1>Options</h1>
      <button onClick={() => setSpeed(1000)}>Slow</button>
      <button onClick={() => setSpeed(500)}>Normal</button>
      <button onClick={() => setSpeed(250)}>Fast</button>
      <button onClick={() => setSpeed(100)}>Very Fast</button>
      <button onClick={() => setSpeed(50)}>Speed of Light</button>
    </div>
  );
};

export default Options;
