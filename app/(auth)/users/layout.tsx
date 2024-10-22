import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const session = await auth();

  if (session?.user) {
    return redirect("/feed");
  }

  return <>{children}</>;
};

export default Layout;
