import { signal } from '@preact/signals';
import { Position } from '../components/SnakeStyles';
import { generateRandomNumber } from '../functions/snakeFunctions';
//context Provider or global State Management is not necassary for this project.
//Too much overhead

//20x20 board, om a x and y coordinate system of 0-19
const MAX_BOARD_SIIZE = 19;

const foodPosition = signal({
  x: generateRandomNumber(MAX_BOARD_SIIZE),
  y: generateRandomNumber(MAX_BOARD_SIIZE),
});
const snakeHeadOne = signal({
  x: generateRandomNumber(MAX_BOARD_SIIZE),
  y: generateRandomNumber(MAX_BOARD_SIIZE),
});
const snakeHeadTwo = signal({
  x: generateRandomNumber(MAX_BOARD_SIIZE),
  y: generateRandomNumber(MAX_BOARD_SIIZE),
});

const snakeSegmentsOne = signal<Position[]>([]);
const snakeSegmentsTwo = signal<Position[]>([]);
const snakeBellyOne = signal<Position[]>([]);
const snakeBellyTwo = signal<Position[]>([]);

const isGameOver = signal(false);
const speed = signal(500);
const wallHack = signal<boolean>(false);
const activePlayerTwo = signal<boolean>(false);
const startGame = signal<boolean>(false);
const directionOne = signal<number>(generateRandomNumber(3));
const triggerdDirectionKeys = signal(false);
const playerName = signal('');

export {
  wallHack,
  foodPosition,
  snakeHeadOne,
  snakeHeadTwo,
  isGameOver,
  speed,
  snakeSegmentsOne,
  snakeSegmentsTwo,
  snakeBellyOne,
  snakeBellyTwo,
  activePlayerTwo,
  startGame,
  directionOne,
  triggerdDirectionKeys,
  playerName,
};
