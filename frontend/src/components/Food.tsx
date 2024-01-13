import { Signal, useSignal, useSignalEffect } from '@preact/signals';
import generatePosition from '../functions/generatePosition';

type Position = {
  x: number;
  y: number;
};
type FoodStyleProps = {
  position: Signal<Position>;
  onClick: () => void;
};

const FoodStyle = ({ position, onClick }: FoodStyleProps) => {
  const x = position.value.x * 30;
  const y = position.value.y * 30;
  const style = {
    left: `${x}px`,
    bottom: `${y}px`,
    background: 'red',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    position: 'absolute',
  };
  return <div style={style} onClick={onClick} />;
};

const Food = () => {
  const foodPosition = useSignal({ x: 0, y: 0 });

  useSignalEffect(() => {
    console.log(foodPosition.value, 'FOOD');
  });

  const xPos = generatePosition();
  const yPos = generatePosition();
  foodPosition.value = { x: xPos, y: yPos };

  const handleFoodClick = () => {
    foodPosition.value = { x: generatePosition(), y: generatePosition() };
  };

  return <FoodStyle position={foodPosition} onClick={handleFoodClick} />;
};

export default Food;
