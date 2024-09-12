import { getPostDetail } from '@/actions/posts'
import PostForm from '@/components/forms/post-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

interface Props {
  params: {
    postId: string
    siteId: string
  }
}

const PostEditPage = async ({ params }: Props) => {
  const { postId, siteId } = params
  const data = await getPostDetail(postId, siteId)

  return (
    <>
      <div className="flex items-center">
        <Button asChild variant="outline" size="icon" className="mr-3">
          <Link href={`/dashboard/sites/${siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Edit Post</h1>
      </div>
      <PostForm
        siteId={siteId}
        post={{
          ...data,
          content: JSON.stringify(data.content),
        }}
      />
    </>
  )
}

export default PostEditPage
