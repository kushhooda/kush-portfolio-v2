import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Profile
  await prisma.profile.create({
    data: {
      name: 'Kush Hooda',
      age: 16,
      role: 'Fullstack Developer. Backend Rigor & Frontend Interactivity. Seeking graduation opportunities.',
      bio: 'Hybrid developer obsessed with the fusion of technical rigor and visual impact. I don\'t just build websites, I design immersive systems that leave a lasting impression.',
      class: 'DEV_FULLSTACK',
      xpLevel: 'MASTER_DEGREE',
      lang1: 'EN (Fluent)',
      lang2: 'FR (Beginner)',
      instagram: 'whykushh',
      linkedin: 'kushhooda',
      github: 'whykushh',
      website: 'www.bykush.dev',
    },
  })

  // Seed Projects
  const projects = [
    {
      title: 'bykush.dev',
      description: 'Personal portfolio identity. 2026 branding showcase.',
      order: 1,
    },
    {
      title: 'Super Wallet',
      description: 'Production finance app. React Native, Firebase, clean architecture.',
      order: 2,
    },
    {
      title: 'StudentOS',
      description: 'Academic dashboard. Assignments, exams, privacy-conscious.',
      order: 3,
    },
    {
      title: 'Study Flow',
      description: 'Student workflow organization. Thoughtful UX.',
      order: 4,
    },
  ]

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    })
  }

  console.log('Database seeded successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
