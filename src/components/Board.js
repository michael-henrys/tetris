import { useState } from 'react';
import { useEffect } from 'react';
import createBoard from '../game/createBoard';

export default function Board({ tetronimos, isMovingDown }) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(createBoard());
  }, []);

  useEffect(() => {
    const newBoard = createBoard()
    tetronimos.forEach(tetronimo => {
      tetronimo.cells.forEach(cell => {
        newBoard[cell[1]][cell[0]] = {
          type: tetronimo.type,
          isActive: tetronimo.active
        }
      })
    })
    setBoard(newBoard)
  }, [tetronimos])

  return (
    <table>
      <tbody>
      {board.map((row, rowIndex) => {
        return (
          <tr key={rowIndex}>
            {board[rowIndex].map((cell, cellIndex) => {
              return (
                <td 
                  className={`${cell.type} ${cell.isActive ? 'active' : ''} ${isMovingDown && cell.isActive ? 'moving-down' : ''}`} 
                  key={cellIndex}
                ></td>
              )
            })}
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}
