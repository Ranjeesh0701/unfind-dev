"use client";

import { LogOut, Send, Settings, User2 } from "lucide-react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";

import { ICONSIZE } from "@/shared/size";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
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

interface MenuProps {
  user: User | undefined;
}

const Menu: React.FC<MenuProps> = ({ user }) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <Actions />
          <div className="h-[20px] w-[1px] bg-gray-200"></div>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-none">
              <Avatar>
                <AvatarImage src={user.image as string | undefined} />
                <AvatarFallback>
                  <Icon icon={User2} size={ICONSIZE.sm} />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="me-4">
              <DropdownMenuLabel>
                <div className="flex items-center gap-2 max-w-[190px]">
                  <Avatar className="rounded">
                    <AvatarImage src={user?.image as string | undefined} />
                    <AvatarFallback>
                      <Icon icon={User2} size={ICONSIZE.sm} />
                    </AvatarFallback>
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
              <DropdownMenuItem onClick={() => signOut()}>
                <Icon size={ICONSIZE.xs} icon={LogOut} label="Logout" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button size="sm" onClick={() => router.push("/users/sign-in")}>
            Sign in
          </Button>
        </>
      )}
    </div>
  );
};

export default Menu;
