import { getAuthSession } from "@/libs/auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const session = await getAuthSession();

  if (session?.user) {
    return redirect("/feed");
  }

  return <>{children}</>;
};

export default Layout;
