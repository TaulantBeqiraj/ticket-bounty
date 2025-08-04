'use client';

import { LucideKanban, LucideLogOut } from 'lucide-react'
import Link from 'next/link'
import { homePath, signInPath, signUpPath } from '@/paths'
import { ThemeSwitcher } from '@/components/theme/theme-switcher';
import { buttonVariants } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { AccountDropdown } from './account-dropdown';

const Header = () => {
  const {user, isFetched} = useAuth();

  const navItems = user ? (
    <AccountDropdown user={user} />
  ) : (
    <>
      <Link href={signUpPath()} className={buttonVariants({ variant: "outline"})}>
        Sign Up
      </Link>
      <Link href={signInPath()} className={buttonVariants({ variant: "default"})}>
        Sign In
      </Link>

    </>
  )

  if(!isFetched) {
    return null;
  }

  return (
    <nav 
      className="animate-header-from-top supports-backdrop-blur:bg-background/60
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
        {navItems}
      </div>
    </nav>
  )
}

export {Header}