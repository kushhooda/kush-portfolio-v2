'use client'

import { useState } from 'react'
import { verifyAdminLogin } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Overlay from '@/components/ui/Overlay'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await verifyAdminLogin(password)
    
    if (res.success) {
      router.push('/admin')
      router.refresh()
    } else {
      setError(res.error || 'ACCESS DENIED')
      setLoading(false)
    }
  }

  return (
    <div className="scanline relative min-h-screen bg-black flex flex-col items-center justify-center font-mono text-[#e5e5e5] selection:bg-red-500/30">
      <Overlay />
      
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md p-8 border border-primary/30 bg-zinc-950/80 backdrop-blur-md"
        style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.1)' }}
      >
        <div className="absolute -top-3 left-6 bg-black px-2 text-primary text-xs tracking-widest animate-pulse">
          RESTRICTED_AREA
        </div>

        <h1 className="text-3xl font-serif text-white mb-2 tracking-widest uppercase mt-4">Database Override</h1>
        <p className="text-xs text-gray-500 tracking-widest mb-8 uppercase">Authentication required to modify core profile configuration.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs text-primary mb-2 tracking-widest">OVERRIDE_CODE</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/20 p-3 text-white focus:border-primary focus:outline-none transition-colors tracking-widest font-mono"
              placeholder="ENTER SECURE CODE..."
              required
            />
          </div>

          {error && (
            <div className="bg-red-950/50 border border-primary p-3 text-primary text-xs tracking-widest">
              [ ERROR ]: {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full border border-primary px-4 py-4 text-primary hover:bg-primary hover:text-black transition-colors uppercase tracking-widest text-sm disabled:opacity-50"
          >
            {loading ? '[ VERIFYING... ]' : '[ INITIATE_OVERRIDE ]'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[10px] text-gray-600 tracking-widest uppercase">Unauthorized access is strictly prohibited and logged.</p>
        </div>
      </motion.div>
    </div>
  )
}
