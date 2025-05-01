'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface NavLinkProps extends PropsWithChildren {
  href: string
}

export default function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname()
  const isActivePath = path.startsWith(href)

  return (
    <Link href={href} className={isActivePath ? 'active' : undefined}>{children}</Link>
  )
}
