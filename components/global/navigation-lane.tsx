import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppNavbar from "./app-navbar";
import AppSidebar from "./app-sidebar";

type NavigationLaneProps = {
  children: React.ReactNode;
};

const NavigationLane = ({ children }: NavigationLaneProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppNavbar />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default NavigationLane;
