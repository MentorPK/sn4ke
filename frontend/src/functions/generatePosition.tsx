const generatePosition = (multiplier = 19): number => {
  return Math.round(Math.random() * multiplier);
};

export default generatePosition;
