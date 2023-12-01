import Board from '~/components/Board';
import Food from '../components/Food';
import { useState, useEffect } from 'react';

export default function Index() {
  const [direction, setDirection] = useState<string>('');
  const [foodPosition, setFoodPosition] = useState([0, 0]);
  console.log(direction, 'direction');
  useEffect(() => {
    const getKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          if (direction !== 'down') {
            setDirection('up');
          }
          break;
        case 's':
        case 'ArrowDown':
          if (direction !== 'up') {
            setDirection('down');
          }
          break;
        case 'a':
        case 'ArrowLeft':
          if (direction !== 'right') {
            setDirection('left');
          }
          break;
        case 'd':
        case 'ArrowRight':
          if (direction !== 'left') {
            setDirection('right');
          }
          break;
        //FOR DEBUG
        case ' ':
          setDirection('');
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', getKey);
    return () => {
      document.removeEventListener('keydown', getKey);
    };
  }, [direction]);

  return (
    <div>
      <Board>
        <Food foodPosition={foodPosition} setFoodPosition={setFoodPosition} />
      </Board>
    </div>
  );
}
