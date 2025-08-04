"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { accountProfilePage, accountPasswordPage } from "@/paths"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AccountTabs = () => {
  const pathname = usePathname();

  return (
    <Tabs value={pathname.split("/").at(-1)}>
      <TabsList>
        <TabsTrigger value="profile" asChild>
          <Link href={accountProfilePage()}>
            Profile
          </Link>
        </TabsTrigger>
        <TabsTrigger value="password" asChild>
          <Link href={accountPasswordPage()}>
            Password
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export {AccountTabs}