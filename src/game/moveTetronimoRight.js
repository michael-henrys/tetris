import collision from "./collision"

export default function moveTetronimoLeft(tetronimos) {
  //get current Tetronimo
  const tetronimo = tetronimos.find(tetronimo => tetronimo.active)
  //move tetronimo down
  const newTetronimo = getNewTetronimo(tetronimo, tetronimos)
  //replace tetronimo with new tetronimo
  return tetronimos.map(t => t === tetronimo ? newTetronimo : t)
}

const getNewTetronimo = (tetronimo, tetronimos) => {
  //calculate new position
  const newCells = tetronimo.cells.map(cell => {
    return [cell[0] + 1, cell[1]]
  })
  //if there is no collision return the new tetronimo
  if(!collision(newCells, tetronimos)) {
    return { 
      ...tetronimo, 
      cells: newCells }
  } else {
    //if there is a collision return the old tetronimo
    //return deactivated tetronimo
    return {
      ...tetronimo,
      active: false
    }
  }
}
