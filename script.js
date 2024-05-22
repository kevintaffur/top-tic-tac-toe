const gameBoard = (() => {
  const board = [
    ["a", "a", "a"],
    ["a", "a", "a"],
    ["a", "a", "a"]
  ];
 
  const printBoard = () => {
    board.forEach((row) => console.log(row));
  }

  // return true or false if match some symbol on the board
  const checkForWin = () => {
    return ((board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][2] !== "a") ||
            (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][2] !== "a") ||
            (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][2] !== "a") ||
            (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[2][0] !== "a") ||
            (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[2][1] !== "a") ||
            (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[2][2] !== "a") ||
            (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] !== "a") ||
            (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] !== "a"));
  }
  
  // return true if there is a winner
  const updateCoordinate = (row, column, value) => {
    if (row > 2 || column > 2 || row < 0 || column < 0) {
      return printBoard();
    }
    const currentValue = board[row][column];
    if (currentValue === "a") {
      board[row][column] = value;
      printBoard();
      return checkForWin();
    }
  }

  return {
    updateCoordinate,
  };
})();

const createPlayer = (name, symbol) => {
  const getName = () => {name};
  const getSymbol = () => {symbol};

  return {
    getName,
    getSymbol
  }
}
