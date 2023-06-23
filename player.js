const createPlayer = (name, marker) => {
    let score = 0;
  
    const getName = () => name;
    const getMarker = () => marker;
    const getScore = () => score;
    const incrementScore = () => {
      score++;
    };
  
    return {
      getName,
      getMarker,
      getScore,
      incrementScore,
      score,
    };
  };
  
  export { createPlayer };
  