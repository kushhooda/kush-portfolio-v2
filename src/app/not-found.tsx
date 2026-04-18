import Link from 'next/link'
import Overlay from '@/components/ui/Overlay'

export default function NotFound() {
  return (
    <div className="scanline relative min-h-screen bg-black flex flex-col items-center justify-center font-mono text-[#e5e5e5] selection:bg-red-500/30">
      <Overlay />
      
      <div className="relative z-10 w-full max-w-2xl p-8 text-center flex flex-col items-center">
        <div className="text-primary text-sm tracking-widest mb-4 animate-pulse flex items-center justify-center gap-3">
          <div className="w-2 h-2 bg-primary shadow-[0_0_8px_#ef4444]"></div>
          [ SYSTEM_FAILURE ]
        </div>
        
        <h1 className="text-7xl md:text-9xl font-serif text-white mb-2 tracking-tighter">404</h1>
        
        <div className="w-full h-[1px] bg-white/20 my-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-1 bg-primary"></div>
        </div>

        <h2 className="text-xl md:text-2xl text-primary tracking-widest mb-6">FILE_NOT_FOUND</h2>
        
        <p className="text-gray-400 text-sm tracking-widest leading-relaxed mb-12 max-w-lg">
          The requested directory does not exist, has been redacted, or your clearance level is insufficient to view this transmission.
        </p>

        <Link 
          href="/"
          className="border border-white/20 hover:border-primary px-8 py-4 text-white hover:text-primary transition-colors inline-block tracking-widest bg-zinc-950 hover:bg-black uppercase text-sm cursor-pointer"
        >
          [ RETURN_TO_BASE ]
        </Link>
      </div>

      <div className="absolute bottom-12 text-[10px] text-gray-600 tracking-widest">
        ERR_CODE: 0x0000404 // KUSH HOODA OS
      </div>
    </div>
  )
}
