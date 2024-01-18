import { Signal } from '@preact/signals';
import { motion } from 'framer-motion';

export type Position = {
  x: number;
  y: number;
};

type SnakeSegmentProps = {
  position: Position;
  belly: Position[];
};
type SnakeHeadStyleProps = {
  position: Position;
  belly: Position[];
  direction: number;
};

const checkIfBellyFoodMatchesSnakeSegment = (
  position: Position,
  belly: Position[]
) => {
  let match = false;
  if (belly.length > 0) {
    belly.forEach((item) => {
      if (item.x === position.x && item.y === position.y) {
        match = true;
      }
    });
  }
  return match;
};

export const SnakeHeadStyle = ({
  position,
  belly,
  direction,
}: SnakeHeadStyleProps) => {
  const match = checkIfBellyFoodMatchesSnakeSegment(position, belly);

  const x = position.x * 30;
  const y = position.y * 30;
  let deg = 0;
  switch (direction) {
    case 0:
      deg = 0;
      break;
    case 1:
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
  const endureStyle = {
    left: `${x}px`,
    bottom: `${y}px`,
    transform: `rotate(${deg}deg)`,
    borderLeft: '14px solid transparent',
    borderRight: '14px solid transparent',
    borderBottom: '28px solid #3C0000',
    margin: '1px',
    position: 'absolute',
  };

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
  return (
    <motion.div
      style={match ? endureStyle : style}
      initial={{
        transform: `rotate(0deg)`,
      }}
      animate={{
        transform: `rotate(${deg}deg)`,
      }}
    />
  );
};

export const SnakeSegmentStyle = ({ position, belly }: SnakeSegmentProps) => {
  const match = checkIfBellyFoodMatchesSnakeSegment(position, belly);
  const x = position.x * 30;
  const y = position.y * 30;

  const endureStyle = {
    left: `${x}px`,
    bottom: `${y}px`,
    background: '#3C0000',
    width: '24px',
    height: '24px',
    border: '2px solid #253d25',
    margin: '1px',
    position: 'absolute',
  };

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
  return <div style={match ? endureStyle : style} />;
};
