const createGameboard = () => {
    // Initialize the tic tac toe game board array
    const board = ['', '', '', '', '', '', '', '', ''];
  
    // Get the current state of the game board
    const getBoard = () => {
      return board;
    };
  
    // Update a cell on the game board with a marker
    const updateCell = (index, marker) => {
      // Check if the index is valid and the cell is empty
      if (index >= 0 && index < 9 && board[index] === '') {
        board[index] = marker;
        return true; // Return true if the cell is updated successfully
      }
      return false; // Return false if the cell is already taken or index is invalid
    };
  
    // Reset the game board to its initial state
    const resetBoard = () => {
      board.fill('');
    };
    
    // Return the public methods
    return {
      getBoard,
      updateCell,
      resetBoard,
    };
  };
  
  export { createGameboard };
  