'use server'

import { redirect } from 'next/navigation'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import prisma from '@/utils/db'

export const getPostList = async (siteId: string) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return redirect('/api/auth/login')
  }

  const data = await prisma.post.findMany({
    where: {
      userId: user.id,
      siteId,
    },
    select: {
      imageUrl: true,
      title: true,
      createdAt: true,
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return data
}
