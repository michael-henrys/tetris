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
  const [lastTouch, setLastTouch] = useState(null)
  const [touchStart, setTouchStart] = useState(null)
  
  const gameAreaRef = useRef(null)
  
  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 30 

  //when the game area is mounted, focus the element so that keydown events are captured
  useEffect(() => {
    //focus on game area
    gameAreaRef.current.focus()
  })

  //handle touch controls
  const onTouchStart = (e) => {
    const point = {x: e.touches[0].clientX, y: e.touches[0].clientY}
    setLastTouch(point)
    setTouchStart(point)
  }

  const onTouchMove = (e) => {
    if (!lastTouch) return
    const point = {x: e.touches[0].clientX, y: e.touches[0].clientY}
    const  xDistance = lastTouch.x - point.x
    const  yDistance = lastTouch.y - point.y
    const isLeftSwipe = xDistance > minSwipeDistance
    const isRightSwipe = xDistance < -minSwipeDistance
    const isDownSwipe = yDistance < -minSwipeDistance
    console.log(isDownSwipe)
    if(isLeftSwipe) {
      setTetronimos(moveTetronimoLeft(tetronimos))
      setLastTouch(point)
    } else if (isRightSwipe) {
      setTetronimos(moveTetronimoRight(tetronimos))
      setLastTouch(point)
    } else if (isDownSwipe) {
      setTetronimos(moveTetronimoDown(tetronimos))
      setLastTouch(point)
    }
    
  }

  const onTouchEnd = (e) => {
    if (!touchStart) return
    //get the distance between touchStart and touchEnd
    const xDistance = touchStart.x - e.changedTouches[0].clientX
    const yDistance = touchStart.y - e.changedTouches[0].clientY
    //if the smaller than the minimum swipe distance, then it is a tap 
    if (Math.abs(xDistance) < minSwipeDistance && Math.abs(yDistance) < minSwipeDistance) {
      setTetronimos(rotateTetronimo(tetronimos))
    }
    setTouchStart(null)
  }


  //handle keydown controls
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
          //remove complete rows
          const newTetronimos = removeCompleteRows(prevTetronimos)
          //check if game is over
          //create a new tetronimo
          return [...newTetronimos, createTetromino()]
        }else{
          //move tetronimo down
          return moveTetronimoDown(prevTetronimos)
        }
      })
    }, 700)
    return () => clearInterval(interval)
  }, [])

  // useEffect(() => {
  //   //remove complete rows
  //   setTetronimos(removeCompleteRows(tetronimos))

  // }, [tetronimos])

  return (
      <div className='GameArea' tabIndex={0} onKeyDown={handleKeyDown} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} ref={gameAreaRef}>
        <Board tetronimos={tetronimos}/>
      </div>
  )
}
