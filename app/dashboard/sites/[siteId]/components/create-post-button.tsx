import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

const CreatePostButton = () => {
  return (
    <Button asChild>
      <Link href="/dashboard/sites/new">
        <PlusCircle className="mr-2 size-4" /> Create Post
      </Link>
    </Button>
  )
}

export default CreatePostButton
