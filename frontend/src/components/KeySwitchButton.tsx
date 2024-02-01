type KeySwitchButtonProp = {
  keySwitch: 'up' | 'right' | 'down' | 'left' | string;
};

const KeySwitchButton = ({ keySwitch }: KeySwitchButtonProp) => {
  console.log('Received key:', keySwitch);
  let arrow = '';
  switch (keySwitch) {
    case 'up':
      arrow = '↑';
      console.log(keySwitch, 'wat');
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
      break;
  }
  return (
    <button class="pushable">
      <span class="front">{arrow}</span>
    </button>
  );
};

export default KeySwitchButton;
