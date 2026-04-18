'use client'

import { useEffect, useRef } from 'react'

export default function GlobalAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button') || target.closest('a')) {
        if (audioRef.current) {
          // Reset the audio to start to allow rapid clicking
          audioRef.current.currentTime = 0
          audioRef.current.play().catch(e => {
            // Browsers block autoplay until user interaction
            console.log("Audio playback prevented by browser:", e)
          })
        }
      }
    }

    // Attach to the window to catch every click
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <audio ref={audioRef} src="https://www.image2url.com/r2/default/audio/1776512072910-9ba54dee-e7be-4243-83a5-4a462fd956b3.wav" preload="auto" />
  )
}
