import React, { useState } from 'react'

export default function PauseButton({ onClick, disabled }) {
  const [paused, setPaused] = useState(false)

  const togglePause = () => {
    if (disabled) return
    setPaused(!paused)
    onClick()
  }

  return (
    <div className={`button ${disabled ? 'disabled' : ''}`} onClick={togglePause}>
      {!paused ?
          <svg fill="#cccccc"
            width="40px" height="40px" viewBox="0 0 277.338 277.338">
            <g>
              <path d="M14.22,45.665v186.013c0,25.223,16.711,45.66,37.327,45.66c20.618,0,37.339-20.438,37.339-45.66V45.665
              c0-25.211-16.721-45.657-37.339-45.657C30.931,0,14.22,20.454,14.22,45.665z"/>
              <path d="M225.78,0c-20.614,0-37.325,20.446-37.325,45.657V231.67c0,25.223,16.711,45.652,37.325,45.652s37.338-20.43,37.338-45.652
              V45.665C263.109,20.454,246.394,0,225.78,0z"/>
            </g>
          </svg>
        :
          <svg fill="#cccccc"
            width="40px" height="40px" viewBox="0 0 163.861 163.861">
            <g>
              <path d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275
              c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"/>
            </g>
          </svg>
        }
    </div>
  )
}
