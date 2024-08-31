'use server'

import { redirect } from 'next/navigation'

import { Site, siteSchema } from '@/schemas/site'
import { requireAuth } from '@/utils/authentication'
import prisma from '@/utils/db'

export const createSiteAction = async (data: Site) => {
  const user = await requireAuth()

  const submission = siteSchema.safeParse(data)

  if (!submission.success) {
    return submission.error.format()
  }

  await prisma.site.create({
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
  const user = await requireAuth()

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
