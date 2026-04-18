'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Fake progress sequence
    const duration = 3000 // 3 seconds to load
    const intervalTime = 50
    const steps = duration / intervalTime

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          setIsLoaded(true)
          setTimeout(() => setShowWarning(true), 500)
        }, 500)
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [])

  if (isDismissed) return null

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center font-mono text-[#e5e5e5] selection:bg-red-500/30 overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Scanline background */}
        <div className="absolute inset-0 pointer-events-none opacity-50 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-0"></div>

        {/* Loading Phase */}
        {!isLoaded && (
          <motion.div 
            className="w-full max-w-4xl px-8 relative z-10 flex flex-col items-center"
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Animated Wave SVG */}
            <div className="w-full h-32 relative mb-8 flex items-center justify-center">
              <span className="absolute top-0 text-[10px] text-primary">FREQ: 22.9 Hz</span>
              <svg viewBox="0 0 1000 100" className="w-full h-full overflow-visible opacity-80" preserveAspectRatio="none">
                <motion.path
                  d="M0,50 L50,20 L100,70 L150,30 L200,60 L250,40 L300,50 L350,20 L400,80 L450,40 L500,50 L550,30 L600,60 L650,20 L700,70 L750,40 L800,60 L850,20 L900,50 L950,30 L1000,50"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))' }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
            </div>

            <div className="border border-white/20 px-6 py-2 mb-4 bg-black">
              <span className="text-gray-400 tracking-widest text-xs uppercase">SIGNAL TRACING...</span>
            </div>

            <div className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
              {progress}%
            </div>

            {/* Boot Logs */}
            <div className="absolute bottom-[-150px] left-8 flex flex-col gap-1 text-[10px] text-gray-500">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: progress > 10 ? 1 : 0 }}>&gt; RESOLVING_HOST...</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: progress > 25 ? 1 : 0 }}>&gt; PACKET_LOSS_0%</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: progress > 40 ? 1 : 0 }}>&gt; AWAITING_DATABASE...</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: progress > 60 ? 1 : 0 }}>&gt; DOWNLOADING_ASSETS...</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: progress > 80 ? 1 : 0 }}>&gt; ESTABLISHING_SECURE_LINK</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: progress > 95 ? 1 : 0 }} className="text-primary">&gt; HANDSHAKE_COMPLETE</motion.span>
            </div>
          </motion.div>
        )}

        {/* Warning Popup Phase */}
        {showWarning && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-20 border border-primary/50 bg-black p-8 max-w-lg mx-4 text-center"
            style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.1)' }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4 text-primary text-xs tracking-widest">
              SYSTEM_WARNING
            </div>
            
            <h3 className="text-2xl text-white font-serif tracking-widest mb-4 mt-2">ACCESS RESTRICTED</h3>
            
            <p className="text-sm text-gray-400 leading-relaxed mb-8 font-mono">
              This dossier is currently under active development. You may encounter classified bugs, unstable modules, or missing assets. Proceed with caution.
            </p>

            <button 
              onClick={() => setIsDismissed(true)}
              className="border border-primary px-8 py-3 text-primary hover:bg-primary hover:text-black transition-colors uppercase tracking-widest text-sm w-full"
            >
              [ CONTINUE ]
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
