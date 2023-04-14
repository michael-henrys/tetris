import React from 'react'

export default function RestartButton( {onClick } ) {
  return (
    <div onClick={onClick} className='restart-button button'>
      RESET
    </div>
  )
}
