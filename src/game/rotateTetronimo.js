import collision from "./collision"

export default function rotateTetronimo(tetronimos) {
  //get current Tetronimo
  const tetronimo = tetronimos.find(tetronimo => tetronimo.active)
  //move tetronimo down
  const newTetronimo = getNewTetronimo(tetronimo, tetronimos)
  //replace tetronimo with new tetronimo
  return tetronimos.map(t => t === tetronimo ? newTetronimo : t)
}

const getNewTetronimo = (tetronimo, tetronimos) => {
  //set pivot point to center of tetronimo
  const pivot = [tetronimo.cells[1][0], tetronimo.cells[1][1]]

  //calculate new rotated position
  const newCells = tetronimo.cells.map(cell => {
    let x = cell[0] - pivot[0]
    let y = cell[1] - pivot[1]
    //then rotate the cell
    let newX = y
    let newY = -1 * x
    //add the pivot point cell back in
    newX = pivot[0] + newX
    newY = pivot[1] + newY
    return [newX, newY]
  })
  //if there is no collision return the new tetronimo
  if(!collision(newCells, tetronimos)) {
    return { 
      ...tetronimo, 
      cells: newCells }
  } else {
    //if there is a collision return the old tetronimo
    return tetronimo
  }
}