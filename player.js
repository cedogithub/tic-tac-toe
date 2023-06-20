const createPlayer = (name, marker) => {
  // Implementation of the player factory function
  const getName = () => name;
  const getMarker = () => marker;

  return {
    getName,
    getMarker,
  };
};
export { createPlayer };
