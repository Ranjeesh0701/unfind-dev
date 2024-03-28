import Sidebar from "@/components/sidebar";
import { getAuthSession } from "@/libs/auth";
import PostProjectForm from "./components/form";

const page: React.FC = async () => {
  const session = await getAuthSession();

  return (
    <div className="flex flex-row bg-gray-500/10 min-h-[calc(100vh-4rem)]">
      <div className="hidden sm:block w-[30%] sm:w-[40%] md:w-[30%] lg:w-[20%]">
        <Sidebar user={session?.user} />
      </div>
      <PostProjectForm />
    </div>
  );
};

export default page;
