import { useEffect } from 'preact/hooks';
import {
  snakeBellyTwo,
  snakeHeadTwo,
  snakeSegmentsTwo,
  foodPosition,
  startGame,
  speed,
  wallHack,
} from '../signals/globalSignals';
import { SnakeHeadStyle, SnakeSegmentStyle } from './SnakeStyles';
import {
  generateRandomNumber,
  respawmSnake,
  startMoving,
} from '../functions/snakeFunctions';
import { useSignal } from '@preact/signals';

const SnakeTwo = () => {
  //direction need to be thought of cause it will be genrated by the PC
  const direction = useSignal<number>(generateRandomNumber(3));

  useEffect(() => {
    let movingInterval: number | undefined;
    if (startGame.value) {
      const options = {
        snakeHead: snakeHeadTwo,
        snakeSegments: snakeSegmentsTwo,
        snakeBelly: snakeBellyTwo,
        direction: direction,
        wallHack: wallHack,
        speed: speed,
        isBot: true,
        food: foodPosition,
      };
      movingInterval = startMoving(options);
    }

    return () => clearInterval(movingInterval);
  }, [speed.value, startGame.value]);

  useEffect(() => {
    respawmSnake(snakeSegmentsTwo, snakeHeadTwo, direction);
  }, []);

  return (
    <>
      <SnakeHeadStyle
        position={snakeHeadTwo.value}
        belly={snakeBellyTwo.value}
        direction={direction.value}
      />
      {snakeSegmentsTwo.value.map((segment, idx) => (
        <SnakeSegmentStyle
          position={segment}
          belly={snakeBellyTwo.value}
          key={idx}
        />
      ))}
    </>
  );
};
export default SnakeTwo;
