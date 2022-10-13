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

const L = {
  type: 'L',
  active: true,
  cells:
    [[0, 0],
    [1, 0],
    [2, 0],
    [2, 1]]
}

const J = {
  type: 'J',
  active: true,
  cells:
    [[0, 0],
    [1, 0],
    [2, 0],
    [0, 1]]
}

const O = {
  type: 'O',
  active: true,
  cells:
    [[0, 0],
    [1, 0],
    [0, 1],
    [1, 1]]
}

const S = {
  type: 'S',
  active: true,
  cells:
    [[0, 0],
    [1, 0],
    [1, 1],
    [2, 1]]
}

const Z = {
  type: 'Z',
  active: true,
  cells:
    [[0, 1],
    [1, 1],
    [1, 0],
    [2, 0]]
}

export default function createTetromino() {
  //return a random tetromino
  const tetrominos = [T, I, L, J, O, S, Z]
  const randomIndex = Math.floor(Math.random() * tetrominos.length)
  return tetrominos[randomIndex]

}