const T = {
  type: 'T',
  active: true,
  cells:
    [[0, 0],
    [1, 0],
    [2, 0],
    [1, 1]]
}

const I = {
  type: 'I',
  active: true,
  cells:
    [[0, 0],
    [1, 0],
    [2, 0],
    [3, 0]]
}

export default function createTetromino() {
  //create a random number between 0 and 6
  const random = Math.floor(Math.random() * 7)
  //create a tetronimo based on the random number


  return I
}