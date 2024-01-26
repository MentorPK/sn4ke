import { useEffect } from 'preact/hooks';
import {
  snakeBellyTwo,
  snakeHeadTwo,
  snakeSegmentsTwo,
  foodPosition,
  startGame,
  speed,
  wallHack,
  isGameOver,
} from '../signals/globalSignals';
import { SnakeHeadStyle, SnakeSegmentStyle } from './SnakeStyles';
import {
  eatFood,
  generateRandomNumber,
  respawmSnake,
  startMoving,
} from '../functions/snakeFunctions';
import { useSignal } from '@preact/signals';

const SnakeTwo = () => {
  //direction need to be thought of cause it will be genrated by the PC
  const direction = useSignal<number>(generateRandomNumber(3));
  const foodMatchesLastSegment = useSignal<boolean>(false);

  const isHeadEatingSegment = () => {
    const eaten = snakeSegmentsTwo.value.some(
      (segment) =>
        segment.x === snakeHeadTwo.value.x && segment.y === snakeHeadTwo.value.y
    );
    if (eaten) {
      isGameOver.value = true;
    }
  };

  useEffect(() => {
    let movingInterval: number | undefined;
    if (startGame.value) {
      const options = {
        snakeHead: snakeHeadTwo,
        snakeSegments: snakeSegmentsTwo,
        snakeBelly: snakeBellyTwo,
        direction: direction,
        wallHack: wallHack,
        foodMatchesLastSegment: foodMatchesLastSegment,
        speed: speed,
        isBot: true,
        food: foodPosition,
      };
      movingInterval = startMoving(options);
    }
    return () => clearInterval(movingInterval);
  }, [speed.value, startGame.value]);
  useEffect(() => {
    eatFood(snakeHeadTwo, snakeSegmentsTwo, snakeBellyTwo, foodPosition);
    isHeadEatingSegment();
  }, [snakeHeadTwo.value]);
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
