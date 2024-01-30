import React from 'react';
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
  border: '2px solid green',
  borderRadius: '2%',
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
