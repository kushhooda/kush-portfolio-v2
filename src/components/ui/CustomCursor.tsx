'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY })
    }
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button') || target.closest('a')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <div 
      className="fixed pointer-events-none z-[9999]"
      style={{ left: coords.x, top: coords.y }}
    >
      {/* Cursor Shape */}
      <div 
        className={`absolute transition-all duration-200 ${isHovering ? 'w-8 h-8 border border-primary bg-transparent' : 'w-3 h-3 bg-primary'}`}
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>
      
      {/* Offset Coordinates Text */}
      <div className="absolute left-4 top-4 whitespace-nowrap text-primary text-sm font-mono tracking-widest drop-shadow-[0_0_2px_rgba(239,68,68,0.8)]">
        X: {coords.x} Y: {coords.y}
      </div>
    </div>
  )
}
