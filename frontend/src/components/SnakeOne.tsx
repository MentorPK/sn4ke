import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { SnakeHeadStyle, SnakeSegmentStyle } from './SnakeStyles';
import {
  foodPosition,
  isGameOver,
  snakeHeadOne,
  speed,
  snakeSegmentsOne,
  snakeBellyOne,
  wallHack,
  startGame,
} from '../signals/globalSignals';
import {
  eatFood,
  generateRandomNumber,
  respawmSnake,
  startMoving,
} from '../functions/snakeFunctions';

const Snake = () => {
  //direction starts on 12 oclock with 0 top 1 on 3 oclock, 2 on 6, 3 on 9
  const direction = useSignal<number>(generateRandomNumber(3));
  const triggerdDirection = useSignal<boolean>(false);
  const foodMatchesLastSegment = useSignal<boolean>(false);

  const isHeadEatingSegment = () => {
    const eaten = snakeSegmentsOne.value.some(
      (segment) =>
        segment.x === snakeHeadOne.value.x && segment.y === snakeHeadOne.value.y
    );
    if (eaten) {
      isGameOver.value = true;
    }
  };

  const handleGameOver = (): void => {
    if (
      snakeHeadOne.value.x < 0 ||
      snakeHeadOne.value.x >= 20 ||
      snakeHeadOne.value.y < 0 ||
      snakeHeadOne.value.y >= 20
    ) {
      isGameOver.value = true;
    }
  };

  const getInputKey = (e: KeyboardEvent): void => {
    if (!triggerdDirection.value) {
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          if (direction.value !== 2) {
            direction.value = 0;
          }
          break;
        case 's':
        case 'ArrowDown':
          if (direction.value !== 0) {
            direction.value = 2;
          }
          break;
        case 'a':
        case 'ArrowLeft':
          if (direction.value !== 1) {
            direction.value = 3;
          }
          break;
        case 'd':
        case 'ArrowRight':
          if (direction.value !== 3) {
            direction.value = 1;
          }
          break;
        default:
          break;
      }
    }
    triggerdDirection.value = true;
  };

  useEffect(() => {
    eatFood(snakeHeadOne, snakeSegmentsOne, snakeBellyOne, foodPosition);
    if (!wallHack.value) {
      handleGameOver();
    }
    isHeadEatingSegment();
  }, [snakeHeadOne.value]);

  useEffect(() => {
    respawmSnake(snakeSegmentsOne, snakeHeadOne, direction);
  }, []);

  useEffect(() => {
    if (startGame.value) {
      document.addEventListener('keydown', getInputKey);
    }
    return () => {
      document.removeEventListener('keydown', getInputKey);
    };
  }, [triggerdDirection.value, startGame.value]);

  useEffect(() => {
    let movingInterval: number | undefined;
    if (startGame.value) {
      movingInterval = startMoving(
        snakeHeadOne,
        snakeSegmentsOne,
        snakeBellyOne,
        direction,
        triggerdDirection,
        wallHack,
        foodMatchesLastSegment,
        speed,
        false
      );
    }

    return () => clearInterval(movingInterval);
  }, [speed.value, startGame.value]);

  return (
    <>
      <SnakeHeadStyle
        position={snakeHeadOne.value}
        belly={snakeBellyOne.value}
        direction={direction.value}
      />
      {snakeSegmentsOne.value.map((segment, idx) => (
        <SnakeSegmentStyle
          position={segment}
          belly={snakeBellyOne.value}
          key={idx}
        />
      ))}
    </>
  );
};

export default Snake;
