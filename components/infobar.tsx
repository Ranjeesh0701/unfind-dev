"use client";

import { User } from "next-auth";

import { ICONSIZE } from "@/shared/size";
import { User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Icon from "./ui/icon";

interface InforbarProps {
  user?: User;
}

const Infobar: React.FC<InforbarProps> = ({ user }) => {
  return (
    <div className="h-full px-6 py-4">
      <div className="flex flex-col gap-4">
        <div className="rounded-xl bg-white p-4 flex gap-4 items-center">
          <div>
            <Avatar className="rounded">
              <AvatarImage src={user?.image as string | undefined} />
              <AvatarFallback>
                <Icon icon={User2} size={ICONSIZE.sm} />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="overflow-hidden">
            <div className="font-bold truncate">{user?.name}</div>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infobar;
