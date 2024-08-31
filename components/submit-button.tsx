import { Button } from '@/components/ui/button'
import { cn } from '@/utils/ui'
import { Loader2 } from 'lucide-react'

interface Props {
  isLoading: boolean
  className?: string
  text?: string
}

const SubmitButton = ({ isLoading, className, text = 'Submit' }: Props) => {
  return (
    <Button
      type="submit"
      className={cn('w-fit', className)}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 size-4" /> Please wait
        </>
      ) : (
        text
      )}
    </Button>
  )
}

export default SubmitButton
