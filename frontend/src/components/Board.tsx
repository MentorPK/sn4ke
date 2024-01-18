import React from 'react';
import { useContext } from 'preact/hooks';
import { SignalContext } from '../signals/SignalProvider';
interface BoardProps {
  children: React.ReactNode;
}

/* 800 / 40 = 20 Segment Board */
const BOARD_DIMENSION = 600;

const boardStyle = {
  width: `${BOARD_DIMENSION}px`,
  height: `${BOARD_DIMENSION}px`,
  background: '#9bb914',
  position: 'relative',
  border: '2px solid black',
};

const boardContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Board = ({ children }: BoardProps) => {
  return (
    <div style={boardContainer}>
      <div style={boardStyle}>{children}</div>
    </div>
  );
};

export default Board;
