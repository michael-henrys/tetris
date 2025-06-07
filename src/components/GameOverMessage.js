import React from 'react'

export default function GameOverMessage({ onRestart }) {
  return (
    <div className="game-over-overlay">
      <div className="game-over-message">
        <h2>Game Over!</h2>
        <button className="restart-button" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  )
} 