import { auth } from "@/libs/auth";
import Search from "../ui/search";
import Menu from "./menu";

const Navbar: React.FC = async () => {
  const session = await auth();
  return (
    <div className="border-b h-16 flex justify-between items-center px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="hidden sm:block">
          <Search />
        </div>
      </div>
      <div>
        <Menu user={session?.user} />
      </div>
    </div>
  );
};

export default Navbar;
