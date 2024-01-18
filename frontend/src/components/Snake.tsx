import { batch, useSignal } from '@preact/signals';
import generateRandomNumber from '../functions/generateRandomNumber';
import { useEffect } from 'preact/hooks';
import { SnakeHeadStyle, SnakeSegmentStyle } from './SnakeStyles';
import { spawnFood } from './Food';
import { SignalContext } from '../signals/SignalProvider';
import { useContext } from 'preact/hooks';

const Snake = () => {
  const {
    foodPosition,
    isGameOver,
    snakeHead,
    speed,
    segments,
    snakeBelly,
    wallHack,
  } = useContext(SignalContext);

  //direction starts on 12 oclock with 0 top 1 on 3 oclock, 2 on 6, 3 on 9
  const direction = useSignal<number>(generateRandomNumber(3));
  const triggerdDirection = useSignal<boolean>(false);
  const foodMatchesLastSegment = useSignal<boolean>(false);
  const updateSegment = (x: number, y: number): void => {
    segments.value = [...segments.value, { x, y }];
  };
  const spawn = (): void => {
    const snakeHeadX = generateRandomNumber(19);
    const snakeHeadY = generateRandomNumber(19);
    snakeHead.value = { x: snakeHeadX, y: snakeHeadY };

    const arr = [...Array(3).keys()];

    const updatePosition = (offset: number, axis: 'x' | 'y') => {
      arr.forEach((_, idx) => {
        const coord = snakeHead.value[axis] + offset * (idx + 1);
        updateSegment(
          axis === 'x' ? coord : snakeHead.value.x,
          axis === 'y' ? coord : snakeHead.value.y
        );
      });
    };

    if (direction.value === 0) {
      updatePosition(-1, 'y');
    } else if (direction.value === 1) {
      updatePosition(-1, 'x');
    } else if (direction.value === 2) {
      updatePosition(1, 'y');
    } else {
      updatePosition(1, 'x');
    }
  };

  const areSegmentsBehindBoard = (): boolean => {
    return segments.value.some(
      (segment) =>
        segment.x <= 0 || segment.y <= 0 || segment.x >= 20 || segment.y >= 20
    );
  };

  const snakeRespawn = (): void => {
    do {
      //updatePosition function is triggering infite loop because new segments are attached to the old one but never reseted after head spawns
      segments.value = [];
      spawn();
    } while (areSegmentsBehindBoard());
  };

  const generateRandomNotOccupiedFoodPosition = (): void => {
    do {
      spawnFood(foodPosition);
    } while (isFoodOccupyingSnakePosition());
  };

  const isFoodOccupyingSnakePosition = (): boolean => {
    // Check if the position is occupied by the snakehead or segments
    return (
      (foodPosition.value.x === snakeHead.value.x &&
        foodPosition.value.y === snakeHead.value.y) ||
      segments.value.some(
        (segment) =>
          segment.x === foodPosition.value.x &&
          segment.y === foodPosition.value.y
      )
    );
  };

  const move = (): void => {
    const updateMovment = (offset: number, axis: 'x' | 'y') => {
      const coord = snakeHead.value[axis] + offset;
      batch(() => {
        segments.value = segments.value.map((_, idx, arr) => {
          if (idx === 0) {
            return snakeHead.value;
          } else {
            return arr[idx - 1];
          }
        });
        if (wallHack.value) {
          const hackedCord = (coord + 20) % 20;
          snakeHead.value = {
            x: axis === 'x' ? hackedCord : snakeHead.value.x,
            y: axis === 'y' ? hackedCord : snakeHead.value.y,
          };
        } else {
          snakeHead.value = {
            x: axis === 'x' ? coord : snakeHead.value.x,
            y: axis === 'y' ? coord : snakeHead.value.y,
          };
        }
        triggerdDirection.value = false;
      });
      growSnake();
    };
    if (direction.value === 0) {
      updateMovment(1, 'y');
    } else if (direction.value === 1) {
      updateMovment(1, 'x');
    } else if (direction.value === 2) {
      updateMovment(-1, 'y');
    } else {
      updateMovment(-1, 'x');
    }
  };

  const eatFood = (): void => {
    const eating =
      snakeHead.value.x === foodPosition.value.x &&
      snakeHead.value.y === foodPosition.value.y
        ? true
        : false;
    if (eating) {
      snakeBelly.value = [...snakeBelly.value, foodPosition.value];
      generateRandomNotOccupiedFoodPosition();
    }
  };

  const growSnake = (): void => {
    const stomachLenght = snakeBelly.value.length;
    if (stomachLenght > 0 && foodMatchesLastSegment.value) {
      batch(() => {
        segments.value = [...segments.value, snakeBelly.value[0]];
        snakeBelly.value.shift();
        foodMatchesLastSegment.value = false;
      });
    } else if (stomachLenght > 0) {
      const snakeLength = segments.value.length;
      const lastSegment = segments.value[snakeLength - 1];
      foodMatchesLastSegment.value =
        lastSegment.x === snakeBelly.value[0].x &&
        lastSegment.y === snakeBelly.value[0].y;
    }
  };

  const isHeadEatingSegment = () => {
    const eaten = segments.value.some(
      (segment) =>
        segment.x === snakeHead.value.x && segment.y === snakeHead.value.y
    );
    if (eaten) {
      isGameOver.value = true;
    }
  };

  const handleGameOver = (): void => {
    if (
      snakeHead.value.x < 0 ||
      snakeHead.value.x >= 20 ||
      snakeHead.value.y < 0 ||
      snakeHead.value.y >= 20
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

  const startMoving = (): number => {
    const interval = setInterval(() => {
      move();
    }, speed.value);
    return interval;
  };

  useEffect(() => {
    eatFood();
    if (!wallHack.value) {
      handleGameOver();
    }
    isHeadEatingSegment();
  }, [snakeHead.value]);

  useEffect(() => {
    snakeRespawn();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', getInputKey);
    return () => {
      document.removeEventListener('keydown', getInputKey);
    };
  }, [triggerdDirection.value]);

  useEffect(() => {
    const movingInterval = startMoving();
    return () => clearInterval(movingInterval);
  }, [speed.value]);

  return (
    <>
      <SnakeHeadStyle
        position={snakeHead.value}
        belly={snakeBelly.value}
        direction={direction.value}
      />
      {segments.value.map((segment, idx) => (
        <SnakeSegmentStyle
          position={segment}
          belly={snakeBelly.value}
          key={idx}
        />
      ))}
    </>
  );
};

export default Snake;
