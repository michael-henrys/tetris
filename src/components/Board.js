import { useState } from 'react';
import { useEffect } from 'react';
import createBoard from '../game/createBoard';

export default function Board({ tetronimos }) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(createBoard());
  }, []);

  useEffect(() => {
    const newBoard = createBoard()
    tetronimos.forEach(tetronimo => {
      tetronimo.cells.forEach(cell => {
        newBoard[cell[1]][cell[0]] = {
          type: tetronimo.type
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
                <td className={cell.type} key={cellIndex}></td>
              )
            })}
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}
