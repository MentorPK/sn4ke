import { signal } from '@preact/signals';

const foodPosition = signal({ x: 0, y: 0 });
const snakeHead = signal({ x: 0, y: 0 });
const isGameOver = signal(false);

export { foodPosition, snakeHead, isGameOver };
