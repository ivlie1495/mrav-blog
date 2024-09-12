'use client'

import Link from 'next/link'
import { useTransition } from 'react'

import { deletePostAction } from '@/actions/posts'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Props {
  params: {
    postId: string
    siteId: string
  }
}

const PostDeletePage = ({ params }: Props) => {
  const { postId, siteId } = params

  const [isLoading, startTransition] = useTransition()

  const onDelete = () => {
    startTransition(() => {
      deletePostAction(siteId, postId)
    })
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will delete the post and all its
            data.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex w-full justify-end gap-4">
          <Button asChild variant="secondary">
            <Link href={`/dashboard/sites/${siteId}`}>Cancel</Link>
          </Button>
          <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
            {isLoading ? 'Deleting post...' : 'Delete Post'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PostDeletePage
