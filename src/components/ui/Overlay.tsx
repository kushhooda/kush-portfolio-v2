'use client'

import { useEffect, useState } from 'react'

export default function Overlay() {
  const [time, setTime] = useState('')
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

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
      clearInterval(interval)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-40 text-xs font-mono uppercase tracking-widest text-[#e5e5e5]">
      {/* Top Left */}
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <span>CAM_04 [REC]</span>
        <span className="text-primary text-[10px] animate-pulse">SIGNAL_STRONG</span>
      </div>

      {/* Top Right */}
      <div className="absolute top-4 right-4 text-right">
        <span>{time}</span>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <span>LIVE FEED</span>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-4 right-4 text-right text-[10px] text-gray-500">
        <span>SYS. DIAGNOSTIC</span>
        <br />
        <span className="text-primary">STABLE</span>
      </div>

      {/* Center Top Dot */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white z-50"></div>
      
      {/* Laser line from center top to mouse */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 45 }}>
        <line 
          x1="50%" 
          y1="54" 
          x2={coords.x} 
          y2={coords.y} 
          stroke="#ef4444" 
          strokeWidth="1.5"
          opacity="0.8"
          style={{ filter: 'drop-shadow(0px 0px 4px rgba(239, 68, 68, 0.8))' }}
        />
      </svg>
      
      {/* Custom Cursor */}
      <div 
        className="fixed pointer-events-none z-50 transition-all duration-75"
        style={{ left: coords.x, top: coords.y, transform: 'translate(-50%, -50%)' }}
      >
        {/* Cursor Shape */}
        <div className={`transition-all duration-200 ${isHovering ? 'w-8 h-8 border border-primary bg-transparent' : 'w-3 h-3 bg-primary'}`}></div>
        
        {/* Offset Coordinates Text */}
        <div className="absolute left-6 top-6 whitespace-nowrap text-primary text-sm font-mono tracking-widest drop-shadow-[0_0_2px_rgba(239,68,68,0.8)]">
          X: {coords.x} Y: {coords.y}
        </div>
      </div>
    </div>
  )
}
