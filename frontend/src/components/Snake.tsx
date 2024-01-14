import { Signal, useSignal } from '@preact/signals';
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
    borderLeft: '14px solid transparent',
    borderRight: '14px solid transparent',
    borderBottom: '28px solid #326432',
    margin: '1px',
    position: 'absolute',
  };
  return <div style={style}></div>;
};

const SnakeSegmentStyle = ({ position }) => {
  console.log(position, 'POSITION');
  const x = position.x * 30;
  const y = position.y * 30;
  const style = {
    left: `${x}px`,
    bottom: `${y}px`,
    background: '#326432',
    width: '24px',
    height: '24px',
    border: '2px solid #253d25',
    margin: '1px',
    position: 'absolute',
  };
  return <div style={style}></div>;
};
const SnakeSegment = ({ position, direction }) => {
  const segments = useSignal([]);
  const arr = [...Array(3).keys()];
  const updateSegment = (x: number, y: number) => {
    segments.value.push({ x, y });
  };

  const updatePosition = (offset: number, axis: 'x' | 'y') => {
    arr.forEach((_, idx) => {
      const coord = position.value[axis] + offset * (idx + 1);
      updateSegment(
        axis === 'x' ? coord : position.value.x,
        axis === 'y' ? coord : position.value.y
      );
    });
  };

  if (direction === 0) {
    updatePosition(-1, 'y');
  } else if (direction === 1) {
    updatePosition(-1, 'x');
  } else if (direction === 2) {
    updatePosition(1, 'y');
  } else {
    updatePosition(1, 'x');
  }

  return (
    <>
      {segments.value.map((segment, idx) => (
        <SnakeSegmentStyle position={segment} key={idx} />
      ))}
    </>
  );
};

const Snake = () => {
  const snakeHead = useSignal({ x: 0, y: 0 });
  const snakeHeadX = generatePosition();
  const snakeHeadY = generatePosition();
  snakeHead.value = { x: snakeHeadX, y: snakeHeadY };
  //const direction = getDirection();
  const direction = generatePosition(3);
  console.log(snakeHead.value, 'SNAKEHEAD');
  return (
    <>
      <SnakeHeadStyle position={snakeHead} direction={direction} />
      <SnakeSegment position={snakeHead} direction={direction} />
    </>
  );
};

export default Snake;
