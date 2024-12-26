"use client";

import { useSession } from "next-auth/react";

import { Separator } from "../../ui/separator";
import { SidebarTrigger } from "../../ui/sidebar";
import NavMenu from "./nav-menu";
import NavMenuActions from "./nav-menu-actions";

const AppNavbar = () => {
  const { data: session } = useSession();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center w-full justify-between gap-2 px-3">
        <SidebarTrigger className="h-5 w-5" />
        <div className="flex items-center">
          <NavMenuActions />
          <Separator orientation="vertical" className="h-4 mx-3" />
          <NavMenu user={session?.user} mini />
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
