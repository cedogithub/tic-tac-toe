import { createGameboard } from "./gameboard.js";
import { createPlayer } from "./player.js";

// Create players using the createPlayer function
const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");

// Create a new game board
const gameboard = createGameboard();

// Function to render the game board on the webpage
const renderGameboard = () => {
  const container = document.querySelector(".gameboard__container");
  const board = gameboard.getBoard();

  // Clear the container
  container.textContent = "";

  // Loop through each cell in the game board array
  board.forEach((currentMarker, index) => {
    // Create a new cell element
    const cell = document.createElement("div");
    cell.classList.add("cell");

    // Assign a CSS class based on the player's marker
    if (currentMarker === "X") {
      cell.classList.add("marker-x");
    } else if (currentMarker === "O") {
      cell.classList.add("marker-o");
    }
    cell.textContent = currentMarker;


    // Add a click event listener to the cell
    cell.addEventListener("click", () => {
      // Call the playRound function and pass the cell index
      playRound(index);
    });

    // Append the cell to the container
    container.appendChild(cell);
  });

  // Update the initial scores on the webpage
  const player1ScoreElement = document.querySelector(".player1-score");
  const player2ScoreElement = document.querySelector(".player2-score");
  player1ScoreElement.textContent = player1.getScore();
  player2ScoreElement.textContent = player2.getScore();
};

// Function to handle a round of the game
let currentPlayer = player1;
let isGameOver = false;

const playRound = (index) => {
  // Check if the game is over
  if (isGameOver) {
    console.log("Game over. Please restart the game.");
    return;
  }
  // Play the sound
  const audioElement = new Audio("./cellClick.mp3");
  audioElement.play();

  // Update the cell on the game board with the current player's marker
  const marker = currentPlayer.getMarker();
  const isCellUpdated = gameboard.updateCell(index, marker);
  const scoreBoard = document.querySelector('.stats__container-score')

  if (isCellUpdated) {
    // Check if the current player has won
    const isWinner = checkWin(marker, currentPlayer);
    if (isWinner) {
        // Announce the winner
        let winnerElement = document.querySelector('.winner');
      winnerElement.textContent = ` ${currentPlayer.getName()} is the winner!`
      isGameOver = true;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === player1 ? player2 : player1;

    // Call the renderGameboard function to display the updated game board
    renderGameboard();
  } else {
    console.log("Invalid move. Please select an empty cell.");
  }
};
const checkWin = (marker) => {
    // Define the winning combinations
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    // Iterate through each winning combination
    for (const combo of winningCombos) {
      let isWinningCombo = true; // Flag to track if all cells in the combination match the marker

      // Check each index in the current combination
      for (const index of combo) {
        const cellMarker = gameboard.getBoard()[index]; // Get the marker at the current index

        // Check if the cell marker matches the player's marker and is not empty
        if (cellMarker !== marker || cellMarker === '') {
          isWinningCombo = false; // Set the flag to false if the marker doesn't match or is empty
          break; // Exit the loop, no need to check further
        }
      }

      // If all cells in the combination match the marker, return true (win)
      if (isWinningCombo) {
        // Increment the winning player's score
        currentPlayer.incrementScore();
        // Play a winning sound
        const audioElement = new Audio("./winner.mp3");
        audioElement.play();


        // Update the scoreboard elements
        const player1ScoreElement = document.querySelector('.player1-score');
        const player2ScoreElement = document.querySelector('.player2-score');

        player1ScoreElement.textContent = player1.getScore(); // Update player 1's score
        player2ScoreElement.textContent = player2.getScore(); // Update player 2's score

        return true;
      }
    }

    // No winning combination found, return false (no win)
    return false;
  };


// Restarts the game
const restartButton = document.querySelector("#restartButton");
restartButton.addEventListener("click", () => {
  gameboard.resetBoard();
  currentPlayer = player1;
  isGameOver = false;
  renderGameboard();
});

// Call the renderGameboard function to display the initial game board
renderGameboard();
