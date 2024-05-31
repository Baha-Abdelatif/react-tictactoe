import "./GameOver.css";
import React from "react";
import PropTypes from "prop-types";

export default function GameOver({ winner, draw, resetBoard }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {draw ? <p>Draw!</p> : <p>{winner} won!</p>}
      <p>
        <button onClick={resetBoard}>Rematch!</button>
      </p>
    </div>
  );
}
GameOver.propTypes = {
  winner: PropTypes.string,
};
