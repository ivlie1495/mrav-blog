import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import PostForm from '@/components/forms/post-form'

interface Props {
  params: {
    siteId: string
  }
}

const CreatePostPage = ({ params }: Props) => {
  const { siteId } = params

  return (
    <>
      <div className="flex items-center">
        <Button asChild size="icon" variant="outline" className="mr-3">
          <Link href={`/dashboard/sites/${siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Craete Post</h1>
      </div>
      <PostForm siteId={siteId} />
    </>
  )
}

export default CreatePostPage
