export default function moveTetronimoDown(tetronimo, tetronimos) {
  //calculate new position
  const newCells = tetronimo.cells.map(cell => {
    return [cell[0], cell[1] + 1]
  })
  //create a new tetronimo with the new position
  const newTetronimo = { ...tetronimo, cells: newCells }
  //if there is no collision return the new tetronimo
  if(!collision(newTetronimo, tetronimos)) {
    return newTetronimo
  } else {
    //if there is a collision return the old tetronimo
    //return deactivated tetronimo
    return {
      ...tetronimo,
      active: false
    }
  }
}

const collision = (tetronimo, tetronimos) => {
  //collision with edge
  if(tetronimo.cells.some(cell => cell[1] >= 15)) {
    return true
  }
  //for each cell in this tetronimo check if it overlaps with any other tetronimo
  if(tetronimo.cells.some(cell => {
    return tetronimos.some(otherTetronimo => {
      if(!otherTetronimo.active) {
        return otherTetronimo.cells.some(otherCell => {
          return otherCell[0] === cell[0] && otherCell[1] === cell[1]
        })
      }
      return false
    })
  })){
    return true
  }
  //if no collision return false
  return false
}
