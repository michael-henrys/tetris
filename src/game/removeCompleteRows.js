export default function removeCompleteRows(tetronimos) {
  //then loop through all rows
  for (let row = 0; row < 15; row++) {
    //first get all cells from all tetronimos
    const cells = tetronimos.reduce((acc, tetronimo) => {
      return [...acc, ...tetronimo.cells]
    }, [])
    //if all cells in this row are occupied
    if (cells.filter(cell => cell[1] === row).length === 10) {
      //remove all cells in this row and return 
      return removeRow(tetronimos, row)
    }
  }
  return tetronimos 
}

function removeRow(tetronimos, row){
  //remove all cells in this row
  let newTetronimos = tetronimos.map(tetronimo => {
    return {
      ...tetronimo,
      cells: tetronimo.cells.filter(cell => cell[1] !== row)
    }
  })
  //move all cells above this row down one row
  newTetronimos = newTetronimos.map(tetronimo => {
    return {
      ...tetronimo,
      cells: tetronimo.cells.map(cell => {
        if (cell[1] < row) {
          return [cell[0], cell[1] + 1]
        }
        return cell
      })
    }
  })
  return newTetronimos
}
