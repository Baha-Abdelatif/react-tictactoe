import { useState } from "react";
import PlayerInfos from "./components/PlayerInfos/PlayerInfos";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";
import GameOver from "./components/GameOver/GameOver";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations";
import { INITIAL_BOARD, INITIAL_PLAYERS } from "./utils/initialGame";
import {
  deriveCurrentPlayer,
  resetBoard,
  handleSelectedSquare,
  handlePlayerNameChange,
  deriveWinner,
  updateBoard,
} from "./utils/logic";

function App() {
  const [movesList, setMovesList] = useState([]);
  const [players, setPlayers] = useState(INITIAL_PLAYERS);

  let gameBoard = [...INITIAL_BOARD.map((arr) => [...arr])];
  updateBoard(movesList, gameBoard);
  const activePlayer = deriveCurrentPlayer(movesList, players);
  const hasWinner = deriveWinner(WINNING_COMBINATIONS, players, gameBoard);
  const hasDraw = movesList.length === 9 && !hasWinner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfos
            defaultName={INITIAL_PLAYERS[0].name}
            playerSymbol={players[0].symbol}
            isActive={activePlayer === players[0].symbol}
            changeName={handlePlayerNameChange}
            points={players[0].score}
            setPlayers={setPlayers}
          />
          <PlayerInfos
            defaultName={INITIAL_PLAYERS[1].name}
            playerSymbol={players[1].symbol}
            isActive={activePlayer === players[1].symbol}
            changeName={handlePlayerNameChange}
            points={players[1].score}
            setPlayers={setPlayers}
          />
        </ol>
        {(hasWinner || hasDraw) && (
          <GameOver
            winner={hasWinner}
            draw={hasDraw}
            resetBoard={() =>
              resetBoard(players, hasWinner, hasDraw, setPlayers, setMovesList)
            }
          />
        )}
        <GameBoard
          onSelect={handleSelectedSquare}
          players={players}
          gameBoard={gameBoard}
          setMovesList={setMovesList}
        />
        <div className="points">
          Score : {players[0].score} - {players[1].score}
        </div>
      </div>
      <Log moves={movesList} />
    </main>
  );
}

export default App;
