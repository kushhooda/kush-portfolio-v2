'use client'

import { useEffect, useState } from 'react'

export default function Overlay() {
  const [time, setTime] = useState('')
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toISOString().substring(11, 19))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearInterval(interval)
      window.removeEventListener('mousemove', handleMouseMove)
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
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white"></div>
      {/* Laser line from center top to mouse */}
      {/* We can do a pseudo laser with SVG */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        <line 
          x1="50%" 
          y1="54" 
          x2={coords.x} 
          y2={coords.y} 
          stroke="#ef4444" 
          strokeWidth="1" 
          strokeDasharray="4 4"
          opacity="0.3"
        />
      </svg>
      
      {/* Cursor coordinates near mouse */}
      <div 
        className="absolute flex items-center gap-2 text-primary transition-all duration-75 ease-out"
        style={{ left: coords.x + 20, top: coords.y + 20 }}
      >
        <div className="w-2 h-2 bg-primary"></div>
        <span className="text-[10px]">
          X: {coords.x} Y: {coords.y}
        </span>
      </div>
    </div>
  )
}
