import React, { useEffect, CSSProperties } from 'react';

const FoodStyle = (position: number[]) => {
  const style = {
    left: `${position[0] * 40}px`,
    top: `${position[1] * 40}px`,
    background: 'red',
    width: '35px',
    height: '35px',
    border: '2px solid black',
    borderRadius: '50em',
    position: 'absolute',
  };
  return <div style={style} />;
};

interface Food {
  foodPosition: number[];
  setFoodPosition: Function;
}

const Food = ({ foodPosition, setFoodPosition }: Food) => {
  useEffect(() => {
    const generatePosition = (): number => {
      return Math.floor(Math.random() * 20);
    };
    const xPosition = generatePosition();
    const yPosition = generatePosition();
    setFoodPosition([xPosition, yPosition]);
  }, [setFoodPosition]);

  return <FoodStyle position={foodPosition} />;
};

export default Food;
