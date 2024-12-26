import Infobar from "@/components/infobar";
import Sidebar from "@/components/sidebar";
import { auth } from "@/libs/auth";
import prisma from "@/libs/db";
import Popular from "./components/popular";
import RecentJobs from "./components/recent-jobs";

const page: React.FC = async () => {
  const session = await auth();

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
      <div className="flex flex-col">
        <Popular />
        {recentJobs.length > 0 ? <RecentJobs recentJobs={recentJobs} /> : null}
      </div>
    </div>
  );
};

export default page;
