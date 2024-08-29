import { Book, PlusCircle, Settings } from 'lucide-react'
import Link from 'next/link'

import { getPostList } from '@/actions/posts'
import { Button } from '@/components/ui/button'

import PostEmpty from './components/post-empty'

interface Props {
  params: {
    siteId: string
  }
}

const SiteDetailPage = async ({ params }: Props) => {
  const { siteId } = params
  const data = await getPostList(siteId)

  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
        <Button asChild variant="secondary">
          <Link href="#">
            <Book className="mr-2 size-4" />
            View Blog
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="#">
            <Settings className="mr-2 size-4" />
            Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${siteId}/posts/new`}>
            <PlusCircle className="mr-2 size-4" />
            Create Post
          </Link>
        </Button>
      </div>
      {data === undefined || data.length === 0 ? (
        <PostEmpty siteId={siteId} />
      ) : (
        <h1>Hello</h1>
      )}
    </>
  )
}

export default SiteDetailPage
