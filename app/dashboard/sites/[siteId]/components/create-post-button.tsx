import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface Props {
  siteId: string
}

const CreatePostButton = ({ siteId }: Props) => {
  return (
    <Button asChild>
      <Link href={`/dashboard/sites/${siteId}/posts/new`}>
        <PlusCircle className="mr-2 size-4" /> Create Post
      </Link>
    </Button>
  )
}

export default CreatePostButton
