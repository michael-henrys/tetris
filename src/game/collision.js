export default function collision (cells, tetronimos){
  //collision with edge
  if(cells.some(cell => cell[1] >= 15)) {
    return true
  }
  //for each cell in this tetronimo check if it overlaps with any other tetronimo
  if(cells.some(cell => {
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