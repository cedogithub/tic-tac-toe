import { createGameboard } from "./gameboard.js";
import { createPlayer } from "./player.js";

// Create players using the createPlayer function
const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");

// Access player properties and methods
console.log(player1.getName()); // Output: 'Player 1'
console.log(player1.getMarker()); // Output: 'X'
console.log(player2.getName()); // Output: 'Player 2'
console.log(player2.getMarker()); // Output: 'O'

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
    cell.textContent = currentMarker;

    // Add a click event listener to the cell
    cell.addEventListener("click", () => {
      // Call the playRound function and pass the cell index
      playRound(index);
    });

    // Append the cell to the container
    container.appendChild(cell);
  });
};

// Function to handle a round of the game
let currentPlayer = player1;

const playRound = (index) => {
  // Update the cell on the game board with the current player's marker
  const marker = currentPlayer.getMarker(); // X
  const isCellUpdated = gameboard.updateCell(index, marker);

  if (isCellUpdated) {
    // Switch to the next player
    currentPlayer = (currentPlayer === player1) ? player2 : player1;

    // Call the renderGameboard function to display the updated game board
    renderGameboard();
  } else {
    console.log("Invalid move. Please select an empty cell.");
  }
};

// Call the renderGameboard function to display the initial game board
renderGameboard();
