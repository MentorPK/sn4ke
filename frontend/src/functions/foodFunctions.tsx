import { Signal } from '@preact/signals';
import { generateRandomNumber } from './snakeFunctions';
import { Position } from '../components/SnakeStyles';

export const spawnFood = (foodPosition: Signal<Position>) => {
  const xPos = generateRandomNumber(19);
  const yPos = generateRandomNumber(19);
  foodPosition.value = { x: xPos, y: yPos };
};
