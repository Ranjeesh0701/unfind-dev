"use client";

import { ChevronsUpDown, LogOut, Send, Settings, User2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ICONSIZE } from "@/shared/size";
import { signOut } from "next-auth/react";
import Icon from "../ui/icon";

interface AppNavUserProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };

  mini?: boolean;
}

export function NavUser({ user, mini = false }: AppNavUserProps) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {mini ? (
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.image || ""} />
                <AvatarFallback>
                  <Icon icon={User2} size={ICONSIZE.sm} />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
          ) : (
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image || ""} alt={user.name || ""} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          )}
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile || mini ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel>
              <div className="flex items-center gap-2">
                <Avatar className="rounded">
                  <AvatarImage src={user.image as string | undefined} />
                  <AvatarFallback>
                    <Icon icon={User2} size={ICONSIZE.sm} />
                  </AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <div className="font-bold truncate">{user.name}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {user.email}
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon size={ICONSIZE.xs} icon={Send} label="Proposals" />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon size={ICONSIZE.xs} icon={Settings} label="Settings" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <Icon size={ICONSIZE.xs} icon={LogOut} label="Logout" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
