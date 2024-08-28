'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { links } from '@/constants/links'
import { cn } from '@/utils/ui'

const NavLinks = () => {
  const pathname = usePathname()

  return (
    <>
      {links.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          href={href}
          className={cn(
            pathname === href
              ? 'bg-muted text-primary'
              : 'bg-none text-muted-foreground',
            'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary/70',
          )}
        >
          <Icon className="size-4" /> {name}
        </Link>
      ))}
    </>
  )
}

export default NavLinks
