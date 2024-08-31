'use server'

import { redirect } from 'next/navigation'

import { Post, postSchema } from '@/schemas/post'
import { requireAuth } from '@/utils/authentication'
import prisma from '@/utils/db'

export const getPostList = async (siteId: string) => {
  const user = await requireAuth()

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

export const createPostAction = async (siteId: string, data: Post) => {
  const user = await requireAuth()

  const submission = postSchema.safeParse(data)

  if (!submission.success) {
    return submission.error.format()
  }

  await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: JSON.parse(data.content),
      imageUrl: data.imageUrl,
      userId: user.id,
      siteId,
    },
  })

  return redirect(`/dashboard/sites/${siteId}`)
}
