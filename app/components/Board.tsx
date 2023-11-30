import React from "react";

interface BoardProps {
    children: React.ReactNode;
  }


/* 800 / 40 = 20 Segment Board */
const BOARD_DIMENSION = 805;

const boardStyle = {
    width: `${BOARD_DIMENSION}px`,
    height: `${BOARD_DIMENSION}px`,
    background: "white",
    position: "relative",
    border: "2px solid black",
    marginTop: "80px"
}

const boardContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const Board = ({ children }: BoardProps) => {
  return <div style={boardContainer}><div style={boardStyle}>{children}</div></div>;
};

export default Board;
