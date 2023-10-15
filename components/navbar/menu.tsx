"use client";

import { Send, Settings, LogOut, ChevronDown } from "lucide-react";
import { User } from "next-auth";

import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Icon from "../ui/icon";
import Actions from "./actions";
import { ICONSIZE } from "@/shared/size";

interface MenuProps {
  user: User | undefined;
}

const Menu: React.FC<MenuProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-3">
      <Actions />
      <div className="h-[20px] w-[1px] bg-gray-200"></div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-visible:outline-none">
          <Avatar>
            <AvatarImage src={user?.image as string | undefined} />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="me-4">
          <DropdownMenuLabel>
            <div className="flex items-center gap-2 max-w-[190px]">
              <Avatar className="rounded">
                <AvatarImage src={user?.image as string | undefined} />
              </Avatar>
              <div className="overflow-hidden">
                <div className="font-bold truncate">{user?.name}</div>
                <div className="text-xs text-gray-500 truncate">
                  {user?.email}
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
          <DropdownMenuItem>
            <Icon size={ICONSIZE.xs} icon={LogOut} label="Logout" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Menu;
