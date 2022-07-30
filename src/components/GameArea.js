import '../styles/GameArea.css'
import Board from './Board.js';
import { useState, useEffect, useRef } from 'react';
import createTetromino from '../game/createTetromino';
import moveTetronimoDown from '../game/moveTetronimoDown';

export default function GameArea() {
  const [tetronimos, setTetronimos] = useState([])
  const gameAreaRef = useRef(null)
  
  const handleKeyDown = ({ key }) => {
      console.log(key)
  }

  useEffect(() => {
    //focus on game area
    gameAreaRef.current.focus()
    //main loop
    const interval = setInterval(() => {
      setTetronimos(prevTetronimos => {
        const currentTetronimo = prevTetronimos.find(tetronimo => tetronimo.active)
        //if there is no active tetronimo
        if(!currentTetronimo) {
          //create a new tetronimo
          return [...prevTetronimos, createTetromino()]
        }else{
          //move tetronimo down
          return moveTetronimoDown(prevTetronimos)
        }
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='GameArea' tabIndex={0} onKeyDown={handleKeyDown} ref={gameAreaRef}>
      <Board tetronimos={tetronimos}/>
    </div>
  )
}
