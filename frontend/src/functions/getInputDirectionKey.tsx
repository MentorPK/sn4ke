import { Signal } from '@preact/signals';

const getInputDirectionKey = (direction: Signal, e: KeyboardEvent) => {
  console.log(e);
  switch (e.key) {
    case 'w':
    case 'ArrowUp':
      if (direction.value !== 2) {
        direction.value = 0;
      }
      break;
    case 's':
    case 'ArrowDown':
      if (direction.value !== 0) {
        direction.value = 2;
      }
      break;
    case 'a':
    case 'ArrowLeft':
      if (direction.value !== 1) {
        direction.value = 3;
      }
      break;
    case 'd':
    case 'ArrowRight':
      if (direction.value !== 3) {
        direction.value = 1;
      }
      break;
    // FOR DEBUG
    case ' ':
      break;
    default:
      break;
  }
};

export default getInputDirectionKey;
