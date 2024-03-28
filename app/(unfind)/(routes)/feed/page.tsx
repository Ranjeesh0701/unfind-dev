import Infobar from "@/components/infobar";
import Sidebar from "@/components/sidebar";
import { getAuthSession } from "@/libs/auth";
import prisma from "@/libs/db";
import Popular from "./components/popular";
import RecentJobs from "./components/recent-jobs";

const page: React.FC = async () => {
  const session = await getAuthSession();

  const recentJobs = await prisma.project.findMany({
    where: {
      NOT: {
        userId: session?.user.id,
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  return (
    <div>
      <div className="flex flex-row">
        <div className="hidden sm:block w-[30%] sm:w-[40%] md:w-[30%] lg:w-[20%]">
          <Sidebar user={session?.user} />
        </div>
        <div className="w-[100%] sm:w-[60%] md:w-[70%] lg:w-[60%] px-4 sm:px-0 pb-5">
          <Popular />
          {recentJobs.length > 0 ? (
            <RecentJobs recentJobs={recentJobs} />
          ) : null}
        </div>
        <div className="hidden lg:block w-[20%]">
          <Infobar user={session?.user} />
        </div>
      </div>
    </div>
  );
};

export default page;
