'use client'

import { useState } from 'react'
import { updateProfile, updateProject, createProject, deleteProject } from '@/lib/actions'
import { Profile, Project } from '@prisma/client'

export default function AdminClient({ 
  initialProfile, 
  initialProjects 
}: { 
  initialProfile: Profile
  initialProjects: Project[] 
}) {
  const [profile, setProfile] = useState(initialProfile)
  const [projects, setProjects] = useState(initialProjects)
  const [isLoading, setIsLoading] = useState(false)

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await updateProfile(profile)
    setIsLoading(false)
    alert('// DB_UPDATE_SUCCESS')
  }

  const handleProjectUpdate = async (project: Project) => {
    setIsLoading(true)
    await updateProject(project.id, project)
    setIsLoading(false)
    alert('// RECORD_MODIFIED')
  }

  return (
    <div className="space-y-16">
      {/* Profile Section */}
      <section className="border border-white/20 p-8 relative bg-black/50">
        <div className="absolute -top-3 left-4 bg-black px-2 text-primary font-bold tracking-widest text-sm">[ SUBJECT_DATA ]</div>
        <form onSubmit={handleProfileUpdate} className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-xs text-gray-500 tracking-widest mb-2">FULL_NAME</label>
              <input 
                type="text" 
                value={profile.name} 
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white focus:outline-none focus:border-primary focus:ring-0 rounded-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 tracking-widest mb-2">PRIMARY_ROLE</label>
              <input 
                type="text" 
                value={profile.role} 
                onChange={(e) => setProfile({...profile, role: e.target.value})}
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white focus:outline-none focus:border-primary focus:ring-0 rounded-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 tracking-widest mb-2">ANALYSIS_BIO</label>
            <textarea 
              value={profile.bio} 
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              className="w-full bg-zinc-900 border border-white/20 p-4 text-white focus:outline-none focus:border-primary h-32 rounded-none"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-gray-500 tracking-widest mb-2">CLASS</label>
              <input 
                type="text" 
                value={profile.class} 
                onChange={(e) => setProfile({...profile, class: e.target.value})}
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white text-sm focus:outline-none focus:border-primary focus:ring-0 rounded-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 tracking-widest mb-2">XP_LEVEL</label>
              <input 
                type="text" 
                value={profile.xpLevel} 
                onChange={(e) => setProfile({...profile, xpLevel: e.target.value})}
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white text-sm focus:outline-none focus:border-primary focus:ring-0 rounded-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 tracking-widest mb-2">LANG_1</label>
              <input 
                type="text" 
                value={profile.lang1} 
                onChange={(e) => setProfile({...profile, lang1: e.target.value})}
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white text-sm focus:outline-none focus:border-primary focus:ring-0 rounded-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 tracking-widest mb-2">LANG_2</label>
              <input 
                type="text" 
                value={profile.lang2} 
                onChange={(e) => setProfile({...profile, lang2: e.target.value})}
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white text-sm focus:outline-none focus:border-primary focus:ring-0 rounded-none"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="border border-primary text-primary hover:bg-primary hover:text-black px-8 py-3 tracking-widest text-sm transition-colors disabled:opacity-50"
          >
            {isLoading ? 'PROCESSING...' : 'EXECUTE_UPDATE'}
          </button>
        </form>
      </section>

      {/* Projects Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <h2 className="text-xl font-bold tracking-widest text-white">EVIDENCE_RECORDS</h2>
          <button 
            onClick={async () => {
              await createProject({ title: 'NEW_RECORD', description: 'EMPTY_FILE', order: projects.length + 1 })
              window.location.reload()
            }}
            className="text-xs border border-white/30 hover:border-white px-4 py-2 transition-colors"
          >
            + INITIALIZE_RECORD
          </button>
        </div>
        
        <div className="grid gap-6">
          {projects.map((project, idx) => (
            <div key={project.id} className="border border-white/10 p-6 relative bg-zinc-950 group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-colors"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] text-gray-500 tracking-widest mb-1">FILE_NAME</label>
                  <input 
                    type="text" 
                    value={project.title} 
                    onChange={(e) => {
                      const newProjects = [...projects]
                      newProjects[idx].title = e.target.value
                      setProjects(newProjects)
                    }}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-1 text-white font-serif text-2xl focus:outline-none focus:border-primary rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 tracking-widest mb-1">EXTERNAL_LINK</label>
                  <input 
                    type="text" 
                    value={project.link || ''} 
                    onChange={(e) => {
                      const newProjects = [...projects]
                      newProjects[idx].link = e.target.value
                      setProjects(newProjects)
                    }}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-1 text-white focus:outline-none focus:border-primary rounded-none mt-2"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-[10px] text-gray-500 tracking-widest mb-1">DATA_LOG</label>
                <textarea 
                  value={project.description} 
                  onChange={(e) => {
                    const newProjects = [...projects]
                    newProjects[idx].description = e.target.value
                    setProjects(newProjects)
                  }}
                  className="w-full bg-zinc-900 border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-primary h-20 rounded-none"
                />
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                <button 
                  onClick={() => handleProjectUpdate(project)}
                  disabled={isLoading}
                  className="text-xs text-primary hover:text-white transition-colors tracking-widest"
                >
                  [ SAVE_RECORD ]
                </button>
                <button 
                  onClick={async () => {
                    if (confirm('WARN: ERASING RECORD IMPLIES PERMANENT DATA LOSS. PROCEED?')) {
                      await deleteProject(project.id)
                      window.location.reload()
                    }
                  }}
                  className="text-[10px] text-red-800 hover:text-primary transition-colors tracking-widest"
                >
                  ERASE
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
