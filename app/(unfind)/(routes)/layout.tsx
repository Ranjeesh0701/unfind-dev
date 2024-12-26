"use client";

import {
  Bookmark,
  FlagTriangleLeft,
  Home,
  List,
  Search,
  SendHorizonal,
} from "lucide-react";

import NavigationLane from "@/components/global/navigation-lane/index";

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
      <div className="min-h-full">{children}</div>
    </NavigationLane>
  );
};

export default Layout;
