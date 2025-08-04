"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { navItems } from "../constants";
import { SidebarItem } from "./sidebar-item";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { usePathname } from "next/navigation";
import { getActivePath } from "@/utils/get-active-path";
import { signInPath, signUpPath } from "@/paths";

const Sidebar = () => {
  const {user, isFetched} = useAuth();

  const pathname = usePathname();

  const {activeIndex} = getActivePath(
    pathname,
    navItems.map(item => item.href),
    [signInPath(), signUpPath()]
  )

  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);  

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => setTransition(false), 200);
  };

  if(!isFetched || !user) {
    return null;
  }

  return (
    <nav
      className={cn(
        "w-[78px] absolute peer animate-sidebar-from-left h-screen border-r pt-24 ",
        isTransition && "duration-200",
        isOpen && "md:w-60",
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem, index) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              isActive={activeIndex === index}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
};

export { Sidebar };