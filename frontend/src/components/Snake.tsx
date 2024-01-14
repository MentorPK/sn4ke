import { batch, computed, useSignal, useSignalEffect } from '@preact/signals';
import generateRandomNumber from '../functions/generateRandomNumber';
import { useEffect } from 'preact/hooks';
import { SnakeHeadStyle, SnakeSegmentStyle } from './SnakeStyles';
import { foodPosition } from './Food';

const Snake = () => {
  const snakeHead = useSignal({ x: 0, y: 0 });
  //direction starts on 12 oclock with 0 top 1 on 3 oclock, 2 on 6, 3 on 9
  const direction = useSignal(generateRandomNumber(3));
  const segments = useSignal([]);
  const spawn = () => {
    const snakeHeadX = generateRandomNumber(19);
    const snakeHeadY = generateRandomNumber(19);
    snakeHead.value = { x: snakeHeadX, y: snakeHeadY };
    const arr = [...Array(3).keys()];
    const updateSegment = (x: number, y: number) => {
      segments.value = [...segments.value, { x, y }];
    };

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

  const move = () => {
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
        snakeHead.value = {
          x: axis === 'x' ? coord : snakeHead.value.x,
          y: axis === 'y' ? coord : snakeHead.value.y,
        };
      });
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

  const eatFood = () => {
    const eating =
      snakeHead.value.x === foodPosition.value.x &&
      snakeHead.value.y === foodPosition.value.y
        ? true
        : false;
    console.log(eating, 'wat2');
    if (eating) {
      const updateSegment = (x: number, y: number) => {
        segments.value = [...segments.value, { x, y }];
      };

      const growSnake = (offset: number, axis: 'x' | 'y') => {
        const length = segments.value.length;
        if (length > 0) {
          const lastSegment = segments.value[length - 1];
          const coord = lastSegment[axis] + offset;
          updateSegment(
            axis === 'x' ? coord : lastSegment.x,
            axis === 'y' ? coord : lastSegment.y
          );
        }
      };
      if (direction.value === 0) {
        growSnake(-1, 'y');
      } else if (direction.value === 1) {
        growSnake(-1, 'x');
      } else if (direction.value === 2) {
        growSnake(1, 'y');
      } else {
        growSnake(1, 'x');
      }
    }
  };
  useSignalEffect(() => {
    console.log(foodPosition.value, snakeHead.value);
  });
  useEffect(() => {
    eatFood();
  }, [snakeHead.value, foodPosition.value]);

  const getInputKey = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        if (direction.value !== 2) {
          direction.value = 0;
          move();
        }
        break;
      case 's':
      case 'ArrowDown':
        if (direction.value !== 0) {
          direction.value = 2;
          move();
        }
        break;
      case 'a':
      case 'ArrowLeft':
        if (direction.value !== 1) {
          direction.value = 3;
          move();
        }
        break;
      case 'd':
      case 'ArrowRight':
        if (direction.value !== 3) {
          direction.value = 1;
          move();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    spawn();
    document.addEventListener('keydown', getInputKey);
    return () => {
      document.removeEventListener('keydown', getInputKey);
    };
  }, []);

  return (
    <>
      <SnakeHeadStyle position={snakeHead} direction={direction.value} />
      {segments.value.map((segment, idx) => (
        <SnakeSegmentStyle position={segment} key={idx} />
      ))}
    </>
  );
};

export default Snake;
