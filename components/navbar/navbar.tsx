import Search from "../ui/search";

import { getAuthSession } from "@/libs/auth";
import Actions from "./actions";

const Navbar: React.FC = async () => {
  const session = await getAuthSession();
  return (
    <div className="border-b flex justify-between items-center px-6 py-3">
      <div className="flex items-center justify-between gap-10">
        <div>
          <p className="hidden sm:block text-lg">Unfind</p>
          <div className="block sm:hidden"></div>
        </div>
        <div className="hidden sm:block">
          <Search />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <Actions />
          <div className="h-[20px] w-[1px] bg-gray-200"></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
