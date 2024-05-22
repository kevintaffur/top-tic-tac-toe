const gameBoard = (() => {
  let board = [
    ["a", "a", "a"],
    ["a", "a", "a"],
    ["a", "a", "a"]
  ];

  const clearBoard = () => {
    board = [
      ["a", "a", "a"],
      ["a", "a", "a"],
      ["a", "a", "a"]
    ]; 
  }

  const getValueAt = (row, column) => {
    return board[row][column];
  }
 
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
  
  const updateCoordinate = (row, column, value) => {
    if (row > 2 || column > 2 || row < 0 || column < 0) {
      return;
    }
    const currentValue = board[row][column];
    if (currentValue === "a") {
      board[row][column] = value;
    }
  }

  const stillPlayable = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "a") {
          return true;
        }
      }
    }
    return false;
  }

  return {
    updateCoordinate,
    checkForWin,
    clearBoard,
    getValueAt,
    stillPlayable
  };
})();

const createPlayer = (n, symbol) => {
  let score = 0;
  let name = n;
  const getName = () => {
    return name;
  };
  const setName = (newName) => {
    name = newName;
  }
  const getSymbol = () => {
    return symbol;
  };
  const getScore = () => {
    return score;
  };
  const updateScore = () => {
    score += 1;
  }

  const play = (row, column) => {
    gameBoard.updateCoordinate(row, column, symbol);
  }

  return {
    getName,
    getSymbol,
    play,
    getScore,
    updateScore,
    setName
  }
}

const gameTurn = (() => {
  const player1 = createPlayer("player1", "X");
  const player2 = createPlayer("player2", "O");

  const start = () => {
    display.update(player1, player2);
  }

  const checkForWin = () => {
    if (gameBoard.checkForWin()) {
      gameBoard.clearBoard();
      display.clearBoard();
      return true;
    }
  }

  const fullBoard = () => {
    if (!gameBoard.stillPlayable()) {
      gameBoard.clearBoard();
      display.clearBoard();
      return true;
    }
  }

  return {
    start,
    checkForWin,
    fullBoard
  }
})();

const display = (() => {
  const cells = document.querySelectorAll(".cell");
  const message = document.querySelector(".container .message");
  const score = document.querySelector(".container .header .score");
  const player1Name = document.querySelector("#player1");
  const player2Name = document.querySelector("#player2");
  const resetButton = document.querySelector(".reset-button");
  
  let symbol = "X";

  const update = (player1, player2) => {
    updateNames(player1, player2);
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        updateNames(player1, player2);
        if (message.textContent !== "") {
          message.textContent = "";
        }
        const position = cell.id;
        const [row, column] = position.split("");
        gameBoard.updateCoordinate(row, column, symbol);
        cell.textContent = gameBoard.getValueAt(row, column);
        
        if (gameTurn.checkForWin()) {
          if (player1.getSymbol() === symbol) {
            message.textContent = `${player1.getName()} won!!`;
            player1.updateScore();
            updateNames(player1, player2);
          } else {
            message.textContent = `${player2.getName()} won!!`;
            player2.updateScore();
            updateNames(player1, player2);
          }
          symbol = "X";
        } else if (gameTurn.fullBoard()) {
          symbol = "X";
        } else if (symbol === "X") {
          symbol = "O";
        } else if (symbol === "O") {
          symbol = "X";
        }
      });
    });
    resetButton.addEventListener("click", () => {
      gameBoard.clearBoard();
      display.clearBoard();
      symbol = "X";
    });
  }

  const updateNames = (player1, player2) => {
    score.textContent = `${player1Name.value}: ${player1.getScore()} vs ${player2Name.value}: ${player2.getScore()}`;
    player1.setName(player1Name.value);
    player2.setName(player2Name.value);
  }

  const clearBoard = () => {
    cells.forEach((cell) => {
      cell.textContent = "";
      gameBoard.clearBoard();
    });
  }
  return {
    update,
    clearBoard
  }
})();

gameTurn.start();
