import KeySwitchButton from './KeySwitchButton';

const DirectionKeys = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div>
        <KeySwitchButton keySwitch="up" />
      </div>
      <div>
        <KeySwitchButton keySwitch="left" />
        <KeySwitchButton keySwitch="down" />
        <KeySwitchButton keySwitch="right" />
      </div>
    </div>
  );
};

export default DirectionKeys;
