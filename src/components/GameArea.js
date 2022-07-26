import '../styles/GameArea.css'
import Board from './Board.js';
import { useState, useEffect } from 'react';
import createTetromino from '../game/createTetromino';
import moveTetronimoDown from '../game/moveTetronimoDown';


export default function GameArea() {
const [tetronimos, setTetronimos] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setTetronimos(prevTetronimos => {
        const currentTetronimo = prevTetronimos.find(tetronimo => tetronimo.active)
        //if there is no active tetronimo
        if(!currentTetronimo) {
        //create a new tetronimo
          return [...prevTetronimos, createTetromino()]
        }else{
          //move tetronimo down
          const newTetronimo = moveTetronimoDown(currentTetronimo, prevTetronimos)
          //replace current tetronimo with new tetronimo
          const newTetronimos = prevTetronimos.map(tetronimo => {
            if(tetronimo.active) {
              return newTetronimo
            }else{
              return tetronimo
            }
          })
        return newTetronimos
        }
      })
    }, 500)
    return () => clearInterval(interval)
  }, [setTetronimos])

  return (
    <div className='GameArea'>
      <Board tetronimos={tetronimos}/>
    </div>
  )
}
