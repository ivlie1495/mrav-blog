'use server'

import { redirect } from 'next/navigation'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import { Site, siteSchema } from '@/schemas/site-schema'
import prisma from '@/utils/db'

export const createSiteAction = async (data: Site) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return redirect('/api/auth/login')
  }

  const submission = siteSchema.safeParse(data)

  if (!submission.success) {
    return submission.error.format()
  }

  const response = await prisma.site.create({
    data: {
      name: submission.data.name,
      description: submission.data.description,
      subdirectory: submission.data.subdirectory,
      userId: user.id,
    },
  })

  return redirect('/dashboard/sites')
}

export const getSiteListAction = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return redirect('/api/auth/login')
  }

  const data = await prisma.site.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return data
}
