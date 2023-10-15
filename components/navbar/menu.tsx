"use client";

import { Send, Settings, LogOut } from "lucide-react";
import { User } from "next-auth";

import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image as string | undefined} />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="me-4">
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
