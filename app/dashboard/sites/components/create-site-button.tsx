import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

const CreateSiteButton = () => {
  return (
    <Button asChild>
      <Link href="/dashboard/sites/new">
        <PlusCircle className="mr-2 size-4" /> Create Site
      </Link>
    </Button>
  )
}

export default CreateSiteButton
