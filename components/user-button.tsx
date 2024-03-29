"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

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

  return <div></div>;
};

export default UserButton;
