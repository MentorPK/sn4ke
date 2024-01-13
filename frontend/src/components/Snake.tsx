import { Signal, signal, useSignal } from '@preact/signals';
import generatePosition from '../functions/generatePosition';

type Position = {
  x: number;
  y: number;
};
type SnakeHeadStyleProps = {
  position: Signal<Position>;
  direction: number;
};
const SnakeHeadStyle = ({ position, direction }: SnakeHeadStyleProps) => {
  const x = position.value.x * 30;
  const y = position.value.y * 30;
  let deg = 0;
  switch (direction) {
    case 0:
      deg = 0;
      break;
    case 1:
      console.log('WAT');
      deg = 90;
      break;
    case 2:
      deg = 180;
      break;
    case 3:
      deg = 270;
      break;
    default:
      deg = 0;
  }
  const style = {
    left: `${x}px`,
    bottom: `${y}px`,
    transform: `rotate(${deg}deg)`,
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderBottom: '30px solid #326432',
    position: 'absolute',
  };
  return <div style={style}></div>;
};

const getDirection = () => {
  const headDirection = generatePosition(3);
  let direction = '';
  switch (headDirection) {
    case 0:
      direction = 'up';
    case 1:
      direction = 'right';
    case 2:
      direction = 'down';
    case 3:
      direction = 'left';
    default:
      direction = 'up';
  }
  return direction;
};

const Snake = () => {
  const snakeHead = useSignal({ x: 0, y: 0 });
  const snakeHeadX = generatePosition();
  const snakeHeadY = generatePosition();
  snakeHead.value = { x: snakeHeadX, y: snakeHeadY };
  //const direction = getDirection();
  const direction = generatePosition(3);
  return <SnakeHeadStyle position={snakeHead} direction={direction} />;
};

export default Snake;
