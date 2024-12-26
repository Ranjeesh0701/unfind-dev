"use client";

import { Workflow } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import NavMenu from "./nav-menu";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Workflow className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-lg">Unfind</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent></SidebarContent>

      <SidebarFooter>{user && <NavMenu user={user} />}</SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
