const CIRCLE_CLASS = "o";
const X_CLASS = "x";
const board = document.getElementById("board");
const cellElements = document.querySelectorAll("[data-cell]");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;
// These are the winning combinations, if you have and 'x' or 'o' in these combinations you win
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const checkWin = (currentClass) => {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
};

const isDraw = () => {
  return cellElements.every((cell) => {
    cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
};

const endGame = (draw) => {
  if (draw) {
    winningMessageElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "X's" : "O's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
};

const setBoardHoverClass = () => {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
};

const startGame = () => {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
};

const swapTurns = () => {
  circleTurn = !circleTurn;
};

const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

const handleClick = (e) => {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  swapTurns();
  setBoardHoverClass();
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
};

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

startGame();
