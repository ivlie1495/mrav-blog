'use server'

import { notFound, redirect } from 'next/navigation'

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

export const getPostDetail = async (postId: string, siteId: string) => {
  const user = await requireAuth()

  const data = await prisma.post.findUnique({
    where: {
      id: postId,
      userId: user.id,
      siteId,
    },
    select: {
      imageUrl: true,
      title: true,
      description: true,
      slug: true,
      content: true,
      id: true,
    },
  })

  if (!data) {
    return notFound()
  }

  return data
}

export const updatePostAction = async (
  siteId: string,
  postId: string,
  data: Post,
) => {
  const user = await requireAuth()

  const submission = postSchema.safeParse(data)

  if (!submission.success) {
    return submission.error.format()
  }

  await prisma.post.update({
    where: {
      id: postId,
      userId: user.id,
      siteId,
    },
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: JSON.parse(data.content),
      imageUrl: data.imageUrl,
    },
  })

  return redirect(`/dashboard/sites/${siteId}`)
}

export const deletePostAction = async (siteId: string, postId: string) => {
  const user = await requireAuth()

  console.log('test teststest')
  await prisma.post.delete({
    where: {
      id: postId,
      userId: user.id,
      siteId,
    },
  })

  return redirect(`/dashboard/sites/${siteId}`)
}
