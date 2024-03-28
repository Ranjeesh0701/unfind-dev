"use client";

import { User2 } from "lucide-react";
import { User } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import {
  AiFillProject,
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";

import { ICONSIZE } from "@/shared/size";
import ListItem from "./list-item";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Icon from "./ui/icon";

interface SidebarProps {
  user?: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const router = useRouter();
  const pathName = usePathname();

  const sidebarItems = [
    {
      icon: RxDashboard,
      label: "Feed",
      spacing: "lg",
      onClick: () => router.push("/feed"),
      active: pathName.includes("/feed"),
    },
    {
      icon: AiFillProject,
      label: "Projects",
      spacing: "lg",
      onClick: () => router.push("/projects"),
      active: pathName.includes("/project"),
    },
    {
      icon: AiOutlineMessage,
      label: "Messages",
      spacing: "lg",
      onClick: () => router.push("/messages"),
      active: pathName.includes("/messages"),
    },
    {
      icon: AiOutlineUser,
      label: "Profile",
      spacing: "lg",
      onClick: () => router.push(`/profile/${user?.id}`),
      active: pathName.includes("/profile"),
    },
    {
      icon: AiOutlineSetting,
      label: "Settings",
      spacing: "lg",
    },
  ];

  return (
    <div className="h-full px-6 pt-4">
      <div className="flex flex-col gap-4">
        <div className="border rounded p-4 flex gap-4 items-center">
          <div>
            <Avatar>
              <AvatarImage src={user?.image as string | undefined} />
              <AvatarFallback>
                <Icon icon={User2} size={ICONSIZE.sm} />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="overflow-hidden">
            <div className="text-lg truncate">{user?.name}</div>
            <p className="text-xs truncate text-gray-500 break-all">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="border rounded">
          <div>
            {sidebarItems.map((item) => (
              <ListItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                spacing={item.spacing}
                onClick={item.onClick}
                active={item.active}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
