"use client";

import { User } from "next-auth";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import UserButton from "../user-button";
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
