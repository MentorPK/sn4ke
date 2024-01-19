import {
  snakeBellyTwo,
  snakeHeadTwo,
  snakeSegmentsTwo,
} from '../signals/globalSignals';
import { SnakeHeadStyle, SnakeSegmentStyle } from './SnakeStyles';

const SnakeTwo = () => {
  //direction need to be thought of cause it will be genrated by the PC
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
