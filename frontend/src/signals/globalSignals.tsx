import { signal } from '@preact/signals';
import { Position } from '../components/SnakeStyles';
//TODO signal contextProvivder

const foodPosition = signal({ x: 0, y: 0 });
const snakeHead = signal({ x: 0, y: 0 });
const isGameOver = signal(false);
const speed = signal(1000);
const segments = signal<Position[]>([]);
const snakeBelly = signal<Position[]>([]);

const globalSignals = {
  foodPosition,
  snakeHead,
  isGameOver,
  speed,
  segments,
  snakeBelly,
};

export default globalSignals;
