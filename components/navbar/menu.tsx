"use client";

import { User } from "next-auth";
import { useRouter } from "next/navigation";

import { NavUser } from "../global/nav-user";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
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
          <Separator orientation="vertical" className="mr-2 h-4" />
          <NavUser user={user} mini />
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
