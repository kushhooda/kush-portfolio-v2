'use client'

import { useEffect, useRef } from 'react'

export default function GlobalAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const handleClick = () => {
      if (audioRef.current) {
        // Reset the audio to start to allow rapid clicking
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(e => {
          // Browsers block autoplay until user interaction, 
          // but since this is triggered by a click, it should usually succeed.
          console.log("Audio playback prevented by browser:", e)
        })
      }
    }

    // Attach to the window to catch every click
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <audio ref={audioRef} src="/sounds/click.mp3" preload="auto" />
  )
}
