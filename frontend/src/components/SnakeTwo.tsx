import { useEffect } from 'preact/hooks';
import {
  snakeBellyTwo,
  snakeHeadTwo,
  snakeSegmentsTwo,
  foodPosition,
} from '../signals/globalSignals';
import { SnakeHeadStyle, SnakeSegmentStyle } from './SnakeStyles';
import {
  generateRandomNumber,
  respawmSnake,
} from '../functions/snakeFunctions';
import { useSignal } from '@preact/signals';

const SnakeTwo = () => {
  //direction need to be thought of cause it will be genrated by the PC
  const direction = useSignal<number>(generateRandomNumber(3));

  const move = () => {
    const difX = snakeHeadTwo.value.x - foodPosition.value.x;
    const difY = snakeHeadTwo.value.y - foodPosition.value.y;
    console.log(difX, difY);
  };
  move();
  useEffect(() => {
    respawmSnake(snakeSegmentsTwo, snakeHeadTwo, direction);
  }, []);

  useEffect(() => {
    move();
  }, []);
  return (
    <>
      <SnakeHeadStyle
        position={snakeHeadTwo.value}
        belly={snakeBellyTwo.value}
        direction={direction.value}
      />
      {snakeSegmentsTwo.value.map((segment, idx) => (
        <SnakeSegmentStyle
          position={segment}
          belly={snakeBellyTwo.value}
          key={idx}
        />
      ))}
    </>
  );
};
export default SnakeTwo;
