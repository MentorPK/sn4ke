import { motion } from 'framer-motion';

export type Position = {
  x: number;
  y: number;
};

type SnakeSegmentProps = {
  position: Position;
  belly: Position[];
  segments: Position[];
  snakeHead: Position;
  idx: number;
};
type SnakeHeadStyleProps = {
  position: Position;
  belly: Position[];
  direction: number;
};

const checkIfArrayMatchesPosition = (position: Position, arr: Position[]) => {
  let match = false;
  if (arr.length > 0) {
    arr.forEach((item) => {
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
  const match = checkIfArrayMatchesPosition(position, belly);

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

export const SnakeSegmentStyle = ({
  position,
  belly,
  segments,
  idx,
  snakeHead,
}: SnakeSegmentProps) => {
  const matchBellyPosition = checkIfArrayMatchesPosition(position, belly);
  const x = position.x * 30;
  const y = position.y * 30;
  let corner = '';
  if (idx !== 0 && idx !== segments.length - 1) {
    if (
      (position.y < segments[idx - 1].y && position.x < segments[idx + 1].x) ||
      (position.y < segments[idx + 1].y && position.x < segments[idx - 1].x)
    ) {
      corner = 'bl';
    } else if (
      (position.y < segments[idx + 1].y && position.x > segments[idx - 1].x) ||
      (position.y < segments[idx - 1].y && position.x > segments[idx + 1].x)
    ) {
      corner = 'br';
    } else if (
      (position.y > segments[idx + 1].y && position.x < segments[idx - 1].x) ||
      (position.y > segments[idx - 1].y && position.x < segments[idx + 1].x)
    ) {
      corner = 'tl';
    } else if (
      (position.y > segments[idx - 1].y && position.x > segments[idx + 1].x) ||
      (position.y > segments[idx + 1].y && position.x > segments[idx - 1].x)
    ) {
      corner = 'tr';
    }
  } else if (idx === 0) {
    if (
      (position.y < snakeHead.y && position.x < segments[idx + 1].x) ||
      (position.y < segments[idx + 1].y && position.x < snakeHead.x)
    ) {
      corner = 'bl';
    } else if (
      (position.y < segments[idx + 1].y && position.x > snakeHead.x) ||
      (position.y < snakeHead.y && position.x > segments[idx + 1].x)
    ) {
      corner = 'br';
    } else if (
      (position.y > segments[idx + 1].y && position.x < snakeHead.x) ||
      (position.y > snakeHead.y && position.x < segments[idx + 1].x)
    ) {
      corner = 'tl';
    } else if (
      (position.y > snakeHead.y && position.x > segments[idx + 1].x) ||
      (position.y > segments[idx + 1].y && position.x > snakeHead.x)
    ) {
      corner = 'tr';
    }
  }

  const cornerRadius = {
    borderTopLeftRadius: corner === 'tl' ? '75%' : '0px',
    borderTopRightRadius: corner === 'tr' ? '75%' : '0px',
    borderBottomLeftRadius: corner === 'bl' ? '75%' : '0px',
    borderBottomRightRadius: corner === 'br' ? '75%' : '0px',
  };

  const style = {
    left: `${x}px`,
    bottom: `${y}px`,
    background: matchBellyPosition ? '#3C0000' : '#326432',
    width: '24px',
    height: '24px',
    border: '2px solid #253d25',
    margin: '1px',
    position: 'absolute',
    ...cornerRadius,
  };

  return <div style={style} />;
};
