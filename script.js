// ---- ROCK PAPER SCISSOR ----

document.addEventListener("DOMContentLoaded", () => {
  const choices = document.querySelectorAll(".choice");
  const resultText = document.getElementById("result-text");
  const userScoreSpan = document.getElementById("user-score");
  const computerScoreSpan = document.getElementById("computer-score");

  let userScore = 0;
  let computerScore = 0;

  const options = ["rock", "paper", "scissors"];

  function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
  }

  function playRound(userChoice) {
    const computerChoice = getComputerChoice();

    if (userChoice === computerChoice) {
      resultText.textContent = `🤝 It's a draw! Both chose ${userChoice}`;
    } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      userScore++;
      resultText.textContent = `🎉 You win! ${userChoice} beats ${computerChoice}`;
    } else {
      computerScore++;
      resultText.textContent = `😢 You lose! ${computerChoice} beats ${userChoice}`;
    }

    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
  }

  choices.forEach(button => {
    button.addEventListener("click", () => {
      const userChoice = button.getAttribute("data-choice");
      playRound(userChoice);
    });
  });
});


// ---- TIC TAC TOE ----
document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const statusText = document.getElementById("game-status");
  const restartBtn = document.getElementById("restart-btn");

  if (board) {
    let currentPlayer = "X";
    let gameActive = true;
    let boardState = ["", "", "", "", "", "", "", "", ""];

    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    function checkWin() {
      for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          return boardState[a];
        }
      }
      return boardState.includes("") ? null : "draw";
    }

    function updateStatus() {
      const winner = checkWin();
      if (winner === "draw") {
        statusText.textContent = "🤝 It's a draw!";
        gameActive = false;
      } else if (winner) {
        statusText.textContent = `🎉 Player ${winner} wins!`;
        gameActive = false;
      } else {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
      }
    }

    function createBoard() {
      board.innerHTML = "";
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
      }
    }

    function handleMove(e) {
      const index = e.target.dataset.index;
      if (!gameActive || boardState[index]) return;

      boardState[index] = currentPlayer;
      e.target.textContent = currentPlayer;
      updateStatus();

      if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }

    restartBtn.addEventListener("click", () => {
      currentPlayer = "X";
      boardState = ["", "", "", "", "", "", "", "", ""];
      gameActive = true;
      createBoard();
      updateStatus();
    });

    createBoard();
    updateStatus();
  }
});
