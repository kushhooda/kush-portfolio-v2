'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const WireframeCube = dynamic(() => import('@/components/3d/WireframeCube'), {
  ssr: false,
  loading: () => <div className="text-primary font-mono text-xs animate-pulse">[ LOADING_3D_ASSETS ]</div>
})
import Overlay from '@/components/ui/Overlay'
import { Profile, Project } from '@prisma/client'

export default function HomePageClient({ profile, projects }: { profile: Profile, projects: Project[] }) {
  const [firstName, lastName] = profile.name.split(' ')

  return (
    <main className="scanline relative bg-black selection:bg-primary/30 font-mono text-[#e5e5e5]">
      <Overlay />
      
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-[100svh] flex flex-col justify-center items-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-30 flex items-center justify-center pointer-events-none">
          <WireframeCube />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center"
        >
          <div className="text-primary text-xs tracking-widest mb-8 border border-primary/30 inline-block px-4 py-1 bg-black/50 backdrop-blur-sm">
            [ TOP SECRET // CASE #2026 ]
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-serif leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 block">
            {firstName.toUpperCase()}<br/>
            {lastName.toUpperCase()}
          </h1>
          
          <p className="mt-12 text-lg md:text-xl font-mono text-gray-400 max-w-2xl mx-auto px-4">
            {profile.role.split('. ').map((sentence, i) => {
              if (sentence.includes('Backend') || sentence.includes('Frontend')) {
                return <span key={i} className="block mt-2"><span className="text-primary">Backend</span> Rigor & <span className="text-primary">Frontend</span> Interactivity.</span>
              }
              return <span key={i} className="block mt-2">{sentence}</span>
            })}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs text-gray-600 tracking-widest animate-pulse"
        >
          SCROLL TO INITIATE
        </motion.div>
      </section>

      {/* SECTION 2: SUBJECT PROFILE */}
      <section className="relative w-full min-h-screen py-24 flex items-center border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <motion.header 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/20 pb-4 mb-16 gap-4"
          >
            <h2 className="text-4xl md:text-6xl font-serif tracking-widest text-white">SUBJECT PROFILE</h2>
            <div className="text-right text-xs text-gray-400 font-mono">
              <p>CASE FILE: KH-Q3</p>
              <p>STATUS: GRADUATING</p>
            </div>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Col: Image & Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 space-y-8"
            >
              <div className="border border-white/10 p-6 relative bg-black/50 group">
                <div className="crosshair-corner crosshair-tl"></div>
                <div className="crosshair-corner crosshair-tr"></div>
                <div className="crosshair-corner crosshair-bl"></div>
                <div className="crosshair-corner crosshair-br"></div>
                
                <h3 className="text-2xl font-bold mb-6 font-mono text-center tracking-widest">{profile.name.toUpperCase()}</h3>
                
                <div className="w-full aspect-square bg-zinc-900 border border-white/20 relative flex items-center justify-center overflow-hidden mb-8">
                  <div className="absolute inset-0 border-2 border-primary/50 opacity-100 m-4 transition-all duration-500 group-hover:scale-95">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -translate-x-1 -translate-y-1"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary translate-x-1 -translate-y-1"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -translate-x-1 translate-y-1"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary translate-x-1 translate-y-1"></div>
                  </div>
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/30 z-10 animate-[pulse_2s_infinite]"></div>
                  <span className="text-zinc-600 font-mono text-sm">[IMAGE CLASSIFIED]</span>
                </div>

                <div className="grid grid-cols-2 gap-6 text-xs text-gray-400">
                  <div>
                    <p className="text-gray-600 tracking-widest mb-1">CLASS:</p>
                    <p className="text-white font-bold">{profile.class}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 tracking-widest mb-1">XP_LEVEL:</p>
                    <p className="text-white font-bold">{profile.xpLevel}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 tracking-widest mb-1">LANG_1:</p>
                    <p className="text-white font-bold">{profile.lang1}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 tracking-widest mb-1">LANG_2:</p>
                    <p className="text-white font-bold">{profile.lang2}</p>
                  </div>
                </div>

                <div className="mt-8 border border-primary p-4 relative bg-primary/5">
                  <div className="absolute -top-2 left-4 bg-black px-2 text-[10px] text-primary">SYSTEM_ALERT</div>
                  <h4 className="text-white font-bold text-lg">OPEN TO WORK</h4>
                  <div className="flex justify-between mt-2 text-[10px] text-gray-500 tracking-widest">
                    <span>// CONTRACTS: ENABLED</span>
                    <span>[REMOTE_READY]</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Col: Bio */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-8 flex flex-col justify-center"
            >
              <div className="border border-white/10 p-8 lg:p-12 relative bg-zinc-950/50 backdrop-blur-sm h-full flex flex-col justify-center">
                <div className="flex justify-between text-xs text-primary mb-12 border-b border-white/10 pb-4 tracking-widest">
                  <span>COMPETENCE_ANALYSIS_REPORT</span>
                  <span>[READ_ONLY]</span>
                </div>

                <p className="text-xl md:text-3xl leading-relaxed md:leading-relaxed text-gray-300 font-serif">
                  {profile.bio.split(' ').map((word, i) => {
                    const w = word.toLowerCase();
                    if (w.includes('technical') || w.includes('impact') || w.includes('immersive') || w.includes('rigor')) {
                      return <span key={i} className="text-primary border border-primary/30 bg-primary/10 px-2 mx-1 font-mono text-lg md:text-2xl">{word}</span>
                    }
                    return word + ' '
                  })}
                </p>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs tracking-widest text-gray-500">
                   {['React', 'Next.js', 'Three.js', 'Framer Motion', 'Tailwind', 'Node.js', 'Prisma'].map(skill => (
                     <span key={skill} className="border border-white/20 px-3 py-1 hover:border-primary hover:text-white transition-colors cursor-default">
                       {skill}
                     </span>
                   ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EVIDENCE ARCHIVE */}
      <section className="relative w-full min-h-screen py-24 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-8 w-full mb-12">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex items-center"
          >
            <div className="border border-primary px-3 py-2 text-sm text-primary mr-6 flex items-center gap-3">
              <div className="w-1.5 h-4 bg-primary animate-pulse"></div>
              0{projects.length} FILES
            </div>
            <h2 className="text-xl md:text-2xl text-gray-500 tracking-widest uppercase">Evidence Archive</h2>
          </motion.div>
        </div>
        
        <div className="w-full overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex overflow-x-auto gap-8 px-8 pb-12 pt-4 snap-x no-scrollbar"
          >
            {projects.map((project, idx) => (
              <div 
                key={project.id} 
                className="snap-center flex-none w-[85vw] max-w-md h-[400px] border border-white/20 bg-zinc-950 p-6 relative group cursor-pointer hover:border-primary transition-all duration-500 hover:-translate-y-2"
              >
                <div className="crosshair-corner crosshair-tl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="crosshair-corner crosshair-tr opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="crosshair-corner crosshair-bl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="crosshair-corner crosshair-br opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute top-6 left-6 text-xs tracking-widest text-primary">EVIDENCE #0{idx + 1}</div>
                <div className="absolute top-6 right-6 text-[10px] text-gray-600 vertical-text origin-top-right rotate-90">PORTFOLIO_FILE</div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="w-full h-[1px] bg-white/20 mb-6 group-hover:bg-primary/50 transition-colors"></div>
                  <h3 className="text-4xl font-serif text-white mb-4">{project.title}</h3>
                  <p className="text-sm text-gray-400 mb-6">{project.description}</p>
                  
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-xs text-primary border border-primary/50 px-4 py-2 hover:bg-primary hover:text-black transition-colors inline-block tracking-widest">
                      [ DECRYPT_LINK ]
                    </a>
                  ) : (
                    <span className="text-xs text-gray-600 tracking-widest">[ NO_LINK_ATTACHED ]</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
