"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Icon from "./ui/icon";
import { LogOut, Send, Settings, User2 } from "lucide-react";
import { ICONSIZE } from "@/shared/size";

const UserButton = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" className="px-6" asChild>
          <Link href="/users/sign-in">Log in</Link>
        </Button>
        <Button className="px-6" asChild>
          <Link href="/users/sign-up">Join us</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <Avatar>
          <AvatarImage src={user.image as string | undefined} />
          <AvatarFallback>
            <Icon icon={User2} size={ICONSIZE.sm} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-xl shadow-2xl"
        align="end"
        sideOffset={10}
      >
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
  );
};

export default UserButton;
