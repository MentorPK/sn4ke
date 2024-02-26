import { computed, effect, useSignal } from '@preact/signals';
import {
  speed,
  snakeSegmentsOne,
  snakeBellyOne,
  wallHack,
  activePlayerTwo,
  startGame,
  triggerdDirectionKeys,
  playerName,
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
  const isSettingOpen = useSignal(true);

  const handleChange = (e: Event) => {
    setTimeout(() => {
      playerName.value = e.target.value;
    }, 250);
  };

  return (
    <div
      style={{
        borderLeft: '8px solid #5E0035',
        backgroundColor: '#0A100D',
        width: `${isSettingOpen.value ? '512px' : '0'}`,
        transition: 'width 0.25s ease-in-out',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => {
          isSettingOpen.value = !isSettingOpen.value;
        }}
        style={{
          position: 'absolute',
          width: '32px',
          height: '64px',
          backgroundColor: '#5E0035',
          borderTop: '2px solid #5E0035',
          borderLeft: '2px solid #5E0035',
          borderRadius: '100px 0 0 100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '-40px',
          top: 'calc(50% - 32px)', // 50%',
          border: 0,
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        {'<'}
      </button>
      <div
        style={{
          padding: '0 128px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <h1 style={{ alignSelf: 'center' }}>Options</h1>
          <div>
            <button onClick={() => (startGame.value = !startGame.value)}>
              Toggle Start Game
            </button>
            <Code obj={{ startGame }} />
          </div>
          <div>
            <h2>Player</h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '12px',
              }}
            >
              <label for="playerName">Name:</label>
              <input name="playerName" type="text" onChange={handleChange} />
            </div>
          </div>
          <div>
            <button
              onClick={() => (activePlayerTwo.value = !activePlayerTwo.value)}
            >
              Toggle SecondPlayer
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
              <button onClick={() => setSpeed(500)}>Slow 500</button>
              <button onClick={() => setSpeed(250)}>Normal 250</button>
              <button onClick={() => setSpeed(100)}>Fast 100</button>
              <button onClick={() => setSpeed(50)}>Very Fast 50</button>
              <button onClick={() => setSpeed(25)}>Speed of Light 25</button>
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
              onClick={() =>
                (triggerdDirectionKeys.value = !triggerdDirectionKeys.value)
              }
            >
              Toggle Direction Buttons
            </button>
            <Code obj={{ triggerdDirectionKeys }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
