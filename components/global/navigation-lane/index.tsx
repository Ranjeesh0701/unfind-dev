"use client";

import { LucideIcon } from "lucide-react";
import { SidebarInset, SidebarProvider } from "../../ui/sidebar";
import AppNavbar from "./app-navbar";
import AppSidebar from "./app-sidebar";

type NavigationLaneProps = {
  children: React.ReactNode;
  items: {
    name: string;
    icon: LucideIcon;
    url: string;
  }[];
};

const NavigationLane = ({ children, items }: NavigationLaneProps) => {
  return (
    <SidebarProvider>
      <AppSidebar items={items} />
      <SidebarInset>
        <AppNavbar />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default NavigationLane;
