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
import UserButton from "../user-button";

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
          <UserButton />
        </>
      ) : (
        <>
          <Button
            className="rounded-full"
            onClick={() => router.push("/users/sign-in")}
          >
            Sign in
          </Button>
        </>
      )}
    </div>
  );
};

export default Menu;
