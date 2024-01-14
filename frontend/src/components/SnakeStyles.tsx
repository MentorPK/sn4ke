import { Signal } from '@preact/signals';
import { motion } from 'framer-motion';

type Position = {
  x: number;
  y: number;
};

type SnakeSegmentProps = {
  position: Position;
};
type SnakeHeadStyleProps = {
  position: Signal<Position>;
  direction: number;
};

export const SnakeHeadStyle = ({
  position,
  direction,
}: SnakeHeadStyleProps) => {
  const x = position.value.x * 30;
  const y = position.value.y * 30;
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
      style={style}
      initial={{ left: '0px', bottom: '0px', opacity: 0 }}
      animate={{ left: `${x}px`, bottom: `${y}px`, opacity: 1 }}
      transition={{ duration: 0.4 }}
    />
  );
};

export const SnakeSegmentStyle = ({ position }: SnakeSegmentProps) => {
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
  return (
    <motion.div
      style={style}
      initial={{ left: `0px`, bottom: `0px`, opacity: 0 }}
      animate={{ left: `${x}px`, bottom: `${y}px`, opacity: 1 }}
      transition={{ duration: 0.4 }}
    />
  );
};
