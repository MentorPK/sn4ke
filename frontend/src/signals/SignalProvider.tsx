import { createContext } from 'preact';
import globalSignals from './globalSignals';
const SignalContext = createContext<any>(null);

const SignalProvider = ({ children }: any) => {
  return (
    <SignalContext.Provider value={globalSignals}>
      {children}
    </SignalContext.Provider>
  );
};

export default SignalProvider;
export { SignalContext };
