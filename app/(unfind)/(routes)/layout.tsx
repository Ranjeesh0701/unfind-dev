import Navbar from "@/components/navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)] bg-secondary">{children}</div>
    </>
  );
};

export default Layout;
