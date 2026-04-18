import prisma from '@/lib/prisma'
import AdminClient from './AdminClient'
import Overlay from '@/components/ui/Overlay'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const profile = await prisma.profile.findFirst()
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
  })

  if (!profile) return <div className="p-8 font-mono text-primary">ERROR: NO_PROFILE_DATA</div>

  return (
    <div className="scanline min-h-screen bg-black text-[#e5e5e5] font-mono selection:bg-red-500/30">
      <Overlay />
      
      <div className="relative z-10 max-w-5xl mx-auto p-8 pt-24">
        <header className="mb-12 border-b border-primary/30 pb-4">
          <div className="text-primary text-xs tracking-widest mb-2 animate-pulse">[ SECURE_PORTAL_ACTIVE ]</div>
          <h1 className="text-4xl font-bold tracking-widest text-white">DATABASE OVERRIDE</h1>
        </header>

        <AdminClient initialProfile={profile} initialProjects={projects} />
      </div>
    </div>
  )
}
