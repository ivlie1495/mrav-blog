import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  content: z.string().min(1),
  description: z.string().min(1).max(500),
  imageUrl: z.string().min(1),
})

export type Post = z.infer<typeof postSchema>
