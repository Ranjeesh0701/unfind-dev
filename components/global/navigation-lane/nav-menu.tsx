"use client";

import { User } from "next-auth";
import { useRouter } from "next/navigation";

import { NavUser } from "./nav-user";
import { Button } from "../../ui/button";

interface NavMenuProps {
  user: User | undefined;
  mini?: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ user, mini = false }) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-3">
      {user ? (
        <NavUser user={user} mini={mini} />
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

export default NavMenu;
