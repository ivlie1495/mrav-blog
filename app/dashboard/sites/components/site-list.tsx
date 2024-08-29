import Image from 'next/image'
import Link from 'next/link'
import { Site } from '@prisma/client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import defaultImage from '@/public/default.png'

interface Props {
  data: Site[]
}

const SiteList = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {data.map((item) => (
        <Card key={item.id}>
          <Image
            src={item.imageUrl ?? defaultImage}
            alt={item.name}
            width={400}
            height={200}
            priority
            className="h-[200px] w-full rounded-lg object-cover"
          />
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/dashboard/sites/${item.id}`}>View Articles</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default SiteList
