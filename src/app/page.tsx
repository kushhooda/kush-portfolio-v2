import prisma from '@/lib/prisma'
import HomePageClient from './HomePageClient'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const profile = await prisma.profile.findFirst()
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
  })

  if (!profile) return <div className="text-primary font-mono p-8">ERROR: NO_PROFILE_DATA. RUN_SEED.</div>

  return <HomePageClient profile={profile} projects={projects} />
}
