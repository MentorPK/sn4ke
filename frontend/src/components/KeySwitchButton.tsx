import { directionOne } from '../signals/globalSignals';

type KeySwitchButtonProp = {
  keySwitch: 'up' | 'right' | 'down' | 'left' | string;
};

const KeySwitchButton = ({ keySwitch }: KeySwitchButtonProp) => {
  const triggerdDirection = (keySwitch: string): void => {
    switch (keySwitch) {
      case 'up':
        directionOne.value = 0;
        break;
      case 'right':
        directionOne.value = 1;
        break;
      case 'down':
        directionOne.value = 2;
        break;
      case 'left':
        directionOne.value = 3;
        break;
      default:
        break;
    }
  };
  let arrow = '';
  switch (keySwitch) {
    case 'up':
      arrow = '↑';
      break;
    case 'right':
      arrow = '→';
      break;
    case 'down':
      arrow = '↓';
      break;
    case 'left':
      arrow = '←';
      break;
    default:
      arrow = keySwitch;
  }
  return (
    <button class="pushable" onClick={() => triggerdDirection(keySwitch)}>
      <span class="front">{arrow}</span>
    </button>
  );
};

export default KeySwitchButton;
