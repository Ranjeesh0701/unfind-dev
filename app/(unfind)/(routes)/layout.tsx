"use client";

import NavigationLane from "@/components/global/navigation-lane";
import {
  Bookmark,
  FlagTriangleLeft,
  Home,
  List,
  Search,
  SendHorizonal,
} from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const items = [
    {
      name: "Home",
      icon: Home,
      url: "/feed",
    },
    {
      name: "Search projects",
      icon: Search,
      url: "/projects",
    },
    {
      name: "Saved",
      icon: Bookmark,
      url: "/bookmarks",
    },
    {
      name: "Proposals",
      icon: SendHorizonal,
      url: "/proposals",
    },
    {
      name: "Contracts",
      icon: List,
      url: "/contracts",
    },
    {
      name: "Reports",
      icon: FlagTriangleLeft,
      url: "/reports",
    },
  ];

  return (
    <NavigationLane items={items}>
      <div className="min-h-full flex">{children}</div>
    </NavigationLane>
  );
};

export default Layout;
