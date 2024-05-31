//  Turns functions:
export function deriveCurrentPlayer(gameTurns, players) {
  let currPlayer = players[0].symbol;
  if (gameTurns.length > 0 && gameTurns[0].player === players[0].symbol) {
    currPlayer = players[1].symbol;
  }
  return currPlayer;
}

export function deriveWinner(combinations, players, gameBoard) {
  let hasWinner = null;
  for (const combination of combinations) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol !== null &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      hasWinner = players.find(
        (player) => player.symbol === firstSquareSymbol
      ).name;
    }
  }
  return hasWinner;
}

// Gameboard functions
export function handleSelectedSquare(
  rowIndex,
  cellIndex,
  setMovesList,
  players
) {
  setMovesList((prevMoves) => {
    const activePlayer = deriveCurrentPlayer(prevMoves, players);
    const updatedMovesList = [
      { square: { row: rowIndex, cell: cellIndex }, player: activePlayer },
      ...prevMoves,
    ];
    return updatedMovesList;
  });
}

export function updateBoard(movesList, gameBoard) {
  for (const move of movesList) {
    const { square, player } = move;
    const { row, cell } = square;
    gameBoard[row][cell] = player;
  }
}

export function resetBoard(
  players,
  hasWinner,
  hasDraw,
  setPlayers,
  setMovesList
) {
  let winnerSymbol = null;
  for (const player of players) {
    player.name === hasWinner ? (winnerSymbol = player.symbol) : null;
  }

  winnerSymbol &&
    !hasDraw &&
    setPlayers((prev) => {
      const winnerIndex = prev.indexOf(
        prev.find((player) => player.symbol === winnerSymbol)
      );
      const newPlayersArray = [...prev];
      newPlayersArray[winnerIndex] = {
        symbol: prev[winnerIndex].symbol,
        name: prev[winnerIndex].name,
        score: prev[winnerIndex].score + 1,
      };
      return [...newPlayersArray];
    });
  setMovesList([]);
}

//  Players functions
export function handlePlayerNameChange(symbol, newName, setPlayers) {
  setPlayers((prev) => {
    const playerIndex = prev.indexOf(
      prev.find((player) => player.symbol === symbol)
    );
    const newPlayersArray = [...prev];
    newPlayersArray[playerIndex] = {
      symbol: prev[playerIndex].symbol,
      name: newName,
      score: prev[playerIndex].score + 1,
    };
    return [...newPlayersArray];
  });
}
