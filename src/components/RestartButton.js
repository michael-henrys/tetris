import React from 'react'

export default function RestartButton({ onClick, disabled }) {
  return (
    <div 
      onClick={() => !disabled && onClick()} 
      className={`restart-button button ${disabled ? 'disabled' : ''}`}
    >
      RESET
    </div>
  )
}
