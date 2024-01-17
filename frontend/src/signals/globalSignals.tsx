import { signal } from '@preact/signals';
import { Position } from '../components/SnakeStyles';

const foodPosition = signal({ x: 0, y: 0 });
const snakeHead = signal({ x: 0, y: 0 });
const isGameOver = signal(false);
const speed = signal(1000);
const segments = signal<Position[]>([]);

export { foodPosition, snakeHead, isGameOver, speed, segments };
