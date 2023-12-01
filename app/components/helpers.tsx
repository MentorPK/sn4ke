import {useRef, useEffect} from 'react';

export const useInterval = (callback: any, delay: number) : void => {
  const savedCallback = useRef<{call: () => void}>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = ():void => {
      if(savedCallback && savedCallback.current)
        savedCallback.current.call();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const matchPosition = (positionOne: number[], positionTwo: number[]): boolean => 
  positionOne[0] === positionTwo[0] && positionOne[1] === positionTwo[1];
