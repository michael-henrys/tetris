import '../styles/GameArea.css'
import Board from './Board.js';
import { useState, useEffect, useRef } from 'react';
import createTetromino from '../game/createTetromino';
import moveTetronimoDown from '../game/moveTetronimoDown';
import moveTetronimoRight from '../game/moveTetronimoRight';
import moveTetronimoLeft from '../game/moveTetronimoLeft';
import rotateTetronimo from '../game/rotateTetronimo';
import removeCompleteRows from '../game/removeCompleteRows';
import PauseButton from './PauseButton';
import RestartButton from './RestartButton';
import GameOverMessage from './GameOverMessage';
import collision from '../game/collision';

export default function GameArea() {
  const [tetronimos, setTetronimos] = useState([])
  const [lastTouch, setLastTouch] = useState(null)
  const [touchStart, setTouchStart] = useState(null)
  const [paused, setPaused] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [isMovingDown, setIsMovingDown] = useState(false)
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
    if(paused || gameOver) return
    const point = {x: e.touches[0].clientX, y: e.touches[0].clientY}
    setLastTouch(point)
    setTouchStart(point)
  }

  const onTouchMove = (e) => {
    if(paused || gameOver) return
    if (!lastTouch) return
    const point = {x: e.touches[0].clientX, y: e.touches[0].clientY}
    const  xDistance = lastTouch.x - point.x
    const  yDistance = lastTouch.y - point.y
    const isLeftSwipe = xDistance > minSwipeDistance
    const isRightSwipe = xDistance < -minSwipeDistance
    const isDownSwipe = yDistance < -minSwipeDistance
    if(isLeftSwipe) {
      setTetronimos(moveTetronimoLeft(tetronimos))
      setLastTouch(point)
    } else if (isRightSwipe) {
      setTetronimos(moveTetronimoRight(tetronimos))
      setLastTouch(point)
    } else if (isDownSwipe) {
      setIsMovingDown(true)
      setTetronimos(moveTetronimoDown(tetronimos))
      setLastTouch(point)
    }
  }

  const onTouchEnd = (e) => {
    if (!touchStart) return
    setIsMovingDown(false)
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
    if(paused || gameOver) return
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
        setIsMovingDown(true)
        setTetronimos(moveTetronimoDown(tetronimos))
        break;
      default:
        break;
    }   
  }

  const handleKeyUp = ({ key }) => {
    if (key === 'ArrowDown') {
      setIsMovingDown(false)
    }
  }
  
  useEffect(() => {
    //main loop
    const interval = setInterval(() => {
      setTetronimos(prevTetronimos => {
        if(paused || gameOver) {
          clearInterval(interval)
          return prevTetronimos
        }
        const currentTetronimo = prevTetronimos.find(tetronimo => tetronimo.active)
        //if there is no active tetronimo
        if(!currentTetronimo) {
          //remove complete rows
          const newTetronimos = removeCompleteRows(prevTetronimos)
          //create a new tetronimo
          const newTetronimo = createTetromino()
          //check if the new tetronimo would collide with existing pieces
          if(collision(newTetronimo.cells, newTetronimos)) {
            //game over - set game over state
            setGameOver(true)
            return prevTetronimos
          }
          // Reset isMovingDown when creating a new tetronimo
          setIsMovingDown(false)
          return [...newTetronimos, newTetronimo]
        }else{
          //move tetronimo down
          const newTetronimos = moveTetronimoDown(prevTetronimos)
          // Check if the tetronimo has landed (is no longer active)
          const hasLanded = !newTetronimos.find(t => t.active)
          if (hasLanded) {
            setIsMovingDown(false)
          }
          return newTetronimos
        }
      })
    }, isMovingDown ? 50 : 700) // Faster movement when moving down
    return () => clearInterval(interval)
  }, [paused, gameOver, isMovingDown])

  const togglePause = () => {
    setPaused(prevPaused => !prevPaused)
  }

  const handleRestart = () => {
    setTetronimos([])
    setGameOver(false)
    setPaused(false)
    setIsMovingDown(false)
  }

  return (
      <div className='row'>
        <div 
          className='board' 
          tabIndex={0} 
          onKeyDown={handleKeyDown} 
          onKeyUp={handleKeyUp}
          onTouchStart={onTouchStart} 
          onTouchMove={onTouchMove} 
          onTouchEnd={onTouchEnd} 
          ref={gameAreaRef}
        >
          <Board tetronimos={tetronimos} isMovingDown={isMovingDown}/>
          {gameOver && <GameOverMessage onRestart={handleRestart} />}
        </div>
        <div className='control-panel'>
          <RestartButton onClick={handleRestart} disabled={gameOver}/>
          <PauseButton onClick={togglePause} disabled={gameOver} />
        </div>
      </div>
  )
}
