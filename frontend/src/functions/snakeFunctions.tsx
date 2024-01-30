import { Signal, batch } from '@preact/signals';
import { Position } from '../components/SnakeStyles';
import { spawnFood } from './foodFunctions';

export const generateRandomNumber = (multiplier: number): number => {
  return Math.round(Math.random() * multiplier);
};
const updateSegments = (
  x: number,
  y: number,
  snakeSegments: Signal<Position[]>
): void => {
  snakeSegments.value = [...snakeSegments.value, { x, y }];
};
const areSegmentsBehindBoard = (snakeSemgnets: Signal<Position[]>): boolean => {
  return snakeSemgnets.value.some(
    (segment) =>
      segment.x <= 0 || segment.y <= 0 || segment.x >= 20 || segment.y >= 20
  );
};
const spawnSnake = (
  snakeHead: Signal<Position>,
  snakeSegments: Signal<Position[]>,
  direction: Signal<number>
): void => {
  const snakeHeadX = generateRandomNumber(19);
  const snakeHeadY = generateRandomNumber(19);
  snakeHead.value = { x: snakeHeadX, y: snakeHeadY };
  const arr = [...Array(3).keys()];

  const updateSnakePosition = (offset: number, axis: 'x' | 'y'): void => {
    arr.forEach((_, idx) => {
      const coord = snakeHead.value[axis] + offset * (idx + 1);
      updateSegments(
        axis === 'x' ? coord : snakeHead.value.x,
        axis === 'y' ? coord : snakeHead.value.y,
        snakeSegments
      );
    });
  };

  if (direction.value === 0) {
    updateSnakePosition(-1, 'y');
  } else if (direction.value === 1) {
    updateSnakePosition(-1, 'x');
  } else if (direction.value === 2) {
    updateSnakePosition(1, 'y');
  } else {
    updateSnakePosition(1, 'x');
  }
};

export const respawmSnake = (
  snakeSegments: Signal<Position[]>,
  snakeHead: Signal<Position>,
  direction: Signal<number>
): void => {
  do {
    //updatePosition function is triggering infite loop because new segments are attached to the old one but never reseted after head spawns
    snakeSegments.value = [];
    spawnSnake(snakeHead, snakeSegments, direction);
  } while (areSegmentsBehindBoard(snakeSegments));
};

const isFoodOccupyingSnakePosition = (
  foodPosition: Signal<Position>,
  snakeHead: Signal<Position>,
  snakeSegments: Signal<Position[]>
): boolean => {
  // Check if the position is occupied by the snakehead or segments
  return (
    (foodPosition.value.x === snakeHead.value.x &&
      foodPosition.value.y === snakeHead.value.y) ||
    snakeSegments.value.some(
      (segment) =>
        segment.x === foodPosition.value.x && segment.y === foodPosition.value.y
    )
  );
};

const generateRandomNotOccupiedFoodPosition = (
  foodPosition: Signal<Position>,
  snakeHead: Signal<Position>,
  snakeSegments: Signal<Position[]>
): void => {
  do {
    spawnFood(foodPosition);
  } while (
    isFoodOccupyingSnakePosition(foodPosition, snakeHead, snakeSegments)
  );
};

export const eatFood = (
  snakeHead: Signal<Position>,
  snakeSegments: Signal<Position[]>,
  snakeBelly: Signal<Position[]>,
  foodPosition: Signal<Position>
): void => {
  const eating =
    snakeHead.value.x === foodPosition.value.x &&
    snakeHead.value.y === foodPosition.value.y
      ? true
      : false;
  if (eating) {
    snakeBelly.value = [...snakeBelly.value, foodPosition.value];
    generateRandomNotOccupiedFoodPosition(
      foodPosition,
      snakeHead,
      snakeSegments
    );
  }
};

const growSnake = (
  snakeBelly: Signal<Position[]>,
  snakeSegments: Signal<(Position | undefined)[]>,
  foodMatchesLastSegment: Signal<boolean>
): void => {
  const stomachLenght = snakeBelly.value.length;
  if (stomachLenght > 0 && foodMatchesLastSegment.value) {
    batch(() => {
      snakeSegments.value = [...snakeSegments.value, snakeBelly.value[0]];
      snakeBelly.value.shift();
      foodMatchesLastSegment.value = false;
    });
  } else if (stomachLenght > 0 && snakeBelly.value[0] !== undefined) {
    const snakeLength = snakeSegments.value.length;
    const lastSegment = snakeSegments.value[snakeLength - 1];
    foodMatchesLastSegment.value =
      lastSegment?.x === snakeBelly.value[0].x &&
      lastSegment?.y === snakeBelly.value[0].y;
  }
};

const isHeadFacingFood = (
  snakeHead: Signal<Position>,
  direction: Signal<number>,
  food: Signal<Position>
): boolean => {
  //If difX is below 0 the foodPosition in more on the right
  const ditanceX = snakeHead.value.x - food.value.x;
  //If difY is below 0 the foodPosition in more on the top
  const distanceY = snakeHead.value.y - food.value.y;
  const matchPosX = snakeHead.value.x === food.value.x;
  const matchPosY = snakeHead.value.y === food.value.y;

  if (matchPosX && direction.value === 0 && distanceY > 0) {
    return true;
  } else if (matchPosX && direction.value === 2 && distanceY < 0) {
    return true;
  } else if (matchPosY && direction.value === 1 && ditanceX > 0) {
    return true;
  } else if (matchPosY && direction.value === 3 && ditanceX < 0) {
    return true;
  } else return false;
};

type TriggerDirection = { offset: number; axis: 'x' | 'y' };
const triggerBotDirection = (
  snakeHead: Signal<Position>,
  direction: Signal<number>,
  food: Signal<Position>,
  triggerdDirection: Signal<boolean>
): TriggerDirection => {
  console.log(direction.value, 'dire');
  triggerdDirection.value = true;
  const headFacesFood = isHeadFacingFood(snakeHead, direction, food);
  const difX = snakeHead.value.x - food.value.x;
  //If difY is below 0 the foodPosition in more on the top
  const difY = snakeHead.value.y - food.value.y;

  if (snakeHead.value.x < food.value.x && direction.value !== 3) {
    direction.value = 1;
    return { offset: 1, axis: 'x' }; // Move right
  } else if (snakeHead.value.x > food.value.x && direction.value !== 1) {
    direction.value = 3;
    return { offset: -1, axis: 'x' }; // Move left
  } else if (snakeHead.value.y < food.value.y && direction.value !== 2) {
    direction.value = 0;
    return { offset: 1, axis: 'y' }; // Move up
  } else if (snakeHead.value.y > food.value.y && direction.value !== 0) {
    direction.value = 2;
    return { offset: -1, axis: 'y' }; // Move down
  }
};

type PlayerMoveOptions = {
  snakeHead: Signal<Position>;
  snakeSegments: Signal<(Position | undefined)[]>;
  snakeBelly: Signal<Position[]>;
  direction: Signal<number>;
  triggerdDirection: Signal<boolean>;
  wallHack: Signal<boolean>;
  foodMatchesLastSegment: Signal<boolean>;
};

type BotMoveOptions = {
  snakeHead: Signal<Position>;
  snakeSegments: Signal<(Position | undefined)[]>;
  snakeBelly: Signal<Position[]>;
  direction: Signal<number>;
  triggerdDirection: Signal<boolean>;
  wallHack: Signal<boolean>;
  foodMatchesLastSegment: Signal<boolean>;
  isBot: true;
  food: Signal<Position>;
};

const move = (options: PlayerMoveOptions | BotMoveOptions): void => {
  const {
    snakeHead,
    snakeSegments,
    snakeBelly,
    direction,
    triggerdDirection,
    wallHack,
    foodMatchesLastSegment,
  } = options;

  const updateMovment = (offset: number, axis: 'x' | 'y') => {
    const coord = snakeHead.value[axis] + offset;
    batch(() => {
      snakeSegments.value = snakeSegments.value.map((_, idx, arr) => {
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
    growSnake(snakeBelly, snakeSegments, foodMatchesLastSegment);
  };
  if ('isBot' in options) {
    const { food } = options;
    const dir = triggerBotDirection(
      snakeHead,
      direction,
      food,
      triggerdDirection
    );
    updateMovment(dir.offset, dir.axis);
  } else {
    if (direction.value === 0) {
      updateMovment(1, 'y');
    } else if (direction.value === 1) {
      updateMovment(1, 'x');
    } else if (direction.value === 2) {
      updateMovment(-1, 'y');
    } else {
      updateMovment(-1, 'x');
    }
  }
};

type StartMoveOptions =
  | {
      snakeHead: Signal<Position>;
      snakeSegments: Signal<(Position | undefined)[]>;
      snakeBelly: Signal<Position[]>;
      direction: Signal<number>;
      triggerdDirection: Signal<boolean>;
      wallHack: Signal<boolean>;
      foodMatchesLastSegment: Signal<boolean>;
      speed: Signal<number>;
      isBot: true;
      food: Signal<Position>;
    }
  | {
      snakeHead: Signal<Position>;
      snakeSegments: Signal<(Position | undefined)[]>;
      snakeBelly: Signal<Position[]>;
      direction: Signal<number>;
      triggerdDirection: Signal<boolean>;
      wallHack: Signal<boolean>;
      foodMatchesLastSegment: Signal<boolean>;
      speed: Signal<number>;
      isBot?: false;
      food?: never;
    };

export const startMoving = (options: StartMoveOptions): number => {
  const { speed } = options;
  const interval = setInterval(() => {
    move(options);
  }, speed.value);
  return interval;
};
