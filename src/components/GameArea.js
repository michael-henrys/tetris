import '../styles/GameArea.css'
import Board from './Board.js';
import { useState, useEffect, useRef } from 'react';
import createTetromino from '../game/createTetromino';
import moveTetronimoDown from '../game/moveTetronimoDown';
import moveTetronimoRight from '../game/moveTetronimoRight';
import moveTetronimoLeft from '../game/moveTetronimoLeft';
import rotateTetronimo from '../game/rotateTetronimo';
import removeCompleteRows from '../game/removeCompleteRows';

export default function GameArea() {
  const [tetronimos, setTetronimos] = useState([])
  const gameAreaRef = useRef(null)

  //when the game area is mounted, focus the element so that keydown events are captured
  useEffect(() => {
    //focus on game area
    gameAreaRef.current.focus()
  })
  
  const handleKeyDown = ({ key }) => {
    console.log(key)
    switch (key) {
      case 'ArrowLeft':
        setTetronimos(moveTetronimoLeft(tetronimos))
        break;
      case 'ArrowRight':
        setTetronimos(moveTetronimoRight(tetronimos))
        break;
      case 'ArrowUp':
        setTetronimos(rotateTetronimo(tetronimos))
        break;
      case 'ArrowDown':
        setTetronimos(moveTetronimoDown(tetronimos))
        break;
      default:
        break;
    }   
  }

  useEffect(() => {
    //main loop
    const interval = setInterval(() => {
      setTetronimos(prevTetronimos => {
        const currentTetronimo = prevTetronimos.find(tetronimo => tetronimo.active)
        //if there is no active tetronimo
        if(!currentTetronimo) {
          
          //check if game is over
          //create a new tetronimo
          return [...prevTetronimos, createTetromino()]
        }else{
          //move tetronimo down
          return moveTetronimoDown(prevTetronimos)
        }
      })
    }, 700)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    //remove complete rows
    setTetronimos(removeCompleteRows(tetronimos))

  }, [tetronimos])

  return (
    <div className='GameArea' tabIndex={0} onKeyDown={handleKeyDown} ref={gameAreaRef}>
      <Board tetronimos={tetronimos}/>
    </div>
  )
}
