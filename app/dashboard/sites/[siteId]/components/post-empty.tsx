import { FileIcon } from 'lucide-react'

import CreatePostButton from './create-post-button'

const PostEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-6 text-center animate-in fade-in-50">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <FileIcon className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">
        You dont have any posts created.
      </h2>
      <p className="mx-auto mb-6 mt-2 max-w-sm text-center text-sm leading-tight text-muted-foreground">
        You currently dont have any Posts. Please create some so that you can
        see them right here.
      </p>
      <CreatePostButton />
    </div>
  )
}

export default PostEmpty
