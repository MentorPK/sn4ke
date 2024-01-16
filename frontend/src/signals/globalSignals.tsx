import { signal } from '@preact/signals';

const foodPosition = signal({ x: 0, y: 0 });
const snakeHead = signal({ x: 0, y: 0 });
const isGameOver = signal(false);
const speed = signal(1000);

export { foodPosition, snakeHead, isGameOver, speed };
