import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as AuthUser } from "@prisma/client";
import { accountPasswordPage, accountProfilePage } from "@/paths";
import { LucideLock, LucideLogOut, LucideUser } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/features/auth/actions/sign-out";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type AccountDropdownProps = {
  user: AuthUser;
}

const AccountDropdown = ({user}: AccountDropdownProps) => {
  return (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarFallback>{user.username[0].toLocaleUpperCase()}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="w-58">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href={accountProfilePage()}>
          <LucideUser />
          <span>Profile</span> 
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={accountPasswordPage()}>
          <LucideLock />
          <span>Password</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <form action={signOut}>
          <LucideLogOut className="mr-2 h-4 w-4"/>
          <button type="submit">Sign Out</button>
        </form>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export {AccountDropdown}