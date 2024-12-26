import NavigationLane from "@/components/global/navigation-lane";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationLane>
      <div className="min-h-full">{children}</div>
    </NavigationLane>
  );
};

export default Layout;
