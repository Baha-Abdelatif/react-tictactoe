import "./GameBoard.css";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

export default function GameBoard({
  onSelect,
  gameBoard,
  setMovesList,
  players,
}) {
  return (
    <ol id="game-board">
      {gameBoard.map((currRow, rowIndex) => {
        return (
          <li key={uuid()}>
            <ol>
              {currRow.map((currCell, cellIndex) => {
                return (
                  <li key={uuid()}>
                    <button
                      onClick={() =>
                        onSelect(rowIndex, cellIndex, setMovesList, players)
                      }
                      disabled={gameBoard[rowIndex][cellIndex] !== null}
                    >
                      {gameBoard[rowIndex][cellIndex]}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
GameBoard.propTypes = {
  onSelect: PropTypes.func,
  gameBoard: PropTypes.any,
};
