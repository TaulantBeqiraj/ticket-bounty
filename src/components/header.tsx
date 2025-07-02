import { LucideKanban } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { homePath, ticketsPath } from '@/paths'
import { ThemeSwitcher } from './theme/theme-switcher'
import { buttonVariants } from './ui/button'

const Header = () => {
  return (
    <nav 
      className="supports-backdrop-blur:bg-background/60
      fixed left-0 right-0 top-0 z-20 
      flex justify-between py-2.5 px-5 w-full
      border-b backdrop-blur"
    >
      <div>
        <Link 
          href={homePath()} 
          className={buttonVariants({variant: "ghost"})}
        >
          <LucideKanban />
          <h1 className="font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className='flex gap-x-2'>
        <ThemeSwitcher />
        <Link 
          href={ticketsPath()} 
          className={buttonVariants({variant: "default"})}
        >
          Tickets
        </Link>
      </div>
    </nav>
  )
}

export {Header}