import React, { useState, useEffect, useRef } from 'react';
import { matchPosition } from './helpers';

interface Segments {
  segments: number[][];
  direction: string;
  position: number[];
}

const SnakeSegments = ({ segments, direction, position }: Segments) => {
  const segmentStyle = {
    left: `${`${position[0] * 40}px`}`,
    top: `${`${position[1] * 40}px`}`,
    width: '35px',
    height: '35px',
    border: '5px solid #011627',
    background: '#1de9b6',
    position: 'absolute',
  };
  const segment = segments.map((segment: Array<number>, idx: number) => {
    return <div style={segmentStyle} key={idx}></div>;
  });
  return <>{segment}</>;
};

const Snake: React.FC<{
  direction: string;
  food: number[];
  setFoodPosition: Function;
}> = ({ direction, food, setFoodPosition }) => {
  const [snakeSegments, setSnakeSegments] = useState<number[][]>([
    [9, 9],
    [9, 10],
  ]);
  const [eatenFood, setEatenFood] = useState<number[][]>([[]]);
  const [matchedLastSegment, setMatched] = useState<boolean>(false);
  //TODO: make food disapear and spawn a new one

  const intervalRef = useRef(0);

  useEffect(() => {
    const moveSnake = (direction: string) => {
      let snake = [...snakeSegments];
      let head = snake[0];
      switch (direction) {
        case 'up':
          head = [head[0], head[1] === 0 ? head[1] + 19 : head[1] - 1];
          break;
        case 'down':
          head = [head[0], head[1] === 19 ? head[1] - 19 : head[1] + 1];
          break;
        case 'left':
          head = [head[0] === 0 ? head[0] + 19 : head[0] - 1, head[1]];
          break;
        case 'right':
          head = [head[0] === 19 ? head[0] - 19 : head[0] + 1, head[1]];
          break;
        default:
          break;
      }
      snake = [head, ...snake];
      if (snake.length > 1 && direction) {
        snake.pop();
      }
      direction && setSnakeSegments(snake);
    };

    let interval: number;
    if (direction) {
      intervalRef.current = setInterval(() => {
        moveSnake(direction);
        const firstSegment = snakeSegments[0];
        const lastSegment = snakeSegments[snakeSegments.length - 1];
        const eaten = matchPosition(firstSegment, food);
        eaten && setEatenFood([...eatenFood, food]);
        const firstFood = eatenFood[0];
        const matchedLast =
          firstFood && eaten && matchPosition(lastSegment, firstFood);
        matchedLast && setMatched(matchedLast);
        if (matchedLastSegment && !matchedLast) {
          setSnakeSegments([...snakeSegments, firstFood]);
          const newFoods = eatenFood.slice(1);
          setEatenFood(newFoods);
          setMatched(false);
        }
      }, 400);
    }

    return () => clearInterval(intervalRef.current);
  }, [direction, eatenFood, food, matchedLastSegment, snakeSegments]);

  return <SnakeSegments segments={snakeSegments} direction={direction} />;
};

export default Snake;
