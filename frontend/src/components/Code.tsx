import { ReactNode } from 'preact/compat';
type Code = {
  obj: any;
};

const Code = ({ obj }: Code) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
      }}
    >
      <pre>{JSON.stringify(obj, null, 2)}</pre>
    </div>
  );
};

export default Code;
