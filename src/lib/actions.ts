'use server'

import prisma from './prisma'
import { revalidatePath } from 'next/cache'

export async function updateProfile(data: any) {
  try {
    const profile = await prisma.profile.findFirst()
    if (profile) {
      await prisma.profile.update({
        where: { id: profile.id },
        data,
      })
    } else {
      await prisma.profile.create({ data })
    }
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Failed to update profile:', error)
    return { success: false, error: 'Failed to update profile' }
  }
}

export async function updateProject(id: string, data: any) {
  try {
    await prisma.project.update({
      where: { id },
      data,
    })
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Failed to update project:', error)
    return { success: false, error: 'Failed to update project' }
  }
}

export async function createProject(data: any) {
  try {
    await prisma.project.create({ data })
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Failed to create project:', error)
    return { success: false, error: 'Failed to create project' }
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete project:', error)
    return { success: false, error: 'Failed to delete project' }
  }
}

import { cookies } from 'next/headers'

export async function verifyAdminLogin(password: string) {
  const correctPassword = process.env.ADMIN_PASSWORD
  
  if (!correctPassword) {
    console.error("ADMIN_PASSWORD env var is not set!")
    return { success: false, error: "System misconfigured. Check server logs." }
  }

  if (password === correctPassword) {
    const cookieStore = await cookies()
    cookieStore.set('admin_auth', 'granted', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    return { success: true }
  } else {
    return { success: false, error: "ACCESS DENIED. INCORRECT OVERRIDE CODE." }
  }
}
