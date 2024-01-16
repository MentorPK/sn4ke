import { Signal, signal, useSignal, useSignalEffect } from '@preact/signals';
import generateRandomNumber from '../functions/generateRandomNumber';
import { motion } from 'framer-motion';
import { useEffect } from 'preact/hooks';
import { foodPosition } from '../signals/globalSignals';
type Position = {
  x: number;
  y: number;
};
type FoodStyleProps = {
  position: Signal<Position>;
};

const FoodStyle = ({ position }: FoodStyleProps) => {
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
  return (
    <motion.div
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    />
  );
};

export const spawnFood = () => {
  const xPos = generateRandomNumber(19);
  const yPos = generateRandomNumber(19);
  foodPosition.value = { x: xPos, y: yPos };
};

const Food = () => {
  spawnFood();
  return <FoodStyle position={foodPosition} />;
};

export default Food;
