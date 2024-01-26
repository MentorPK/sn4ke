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

  //PROTOTYPING
  const move = () => {
    //If difX is below 0 the foodPosition in more on the rightSide
    const difX = snakeHeadTwo.value.x - foodPosition.value.x;
    //If difY is below 0 the foodPosition in more on the top
    const difY = snakeHeadTwo.value.y - foodPosition.value.y;
    //head is more to the left
    if (difX > 0) {
      if (direction.value !== 3) {
      }
      //head is more to the right
    } else if (difX < 0) {
      if (direction.value !== 1) {
      }
      //head is more to the top
    }
    if (difY > 0) {
      if (direction.value !== 0) {
      }
      //head is more to the bottom
    } else if (difY < 0) {
      if (direction.value !== 2) {
      }
    }
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
