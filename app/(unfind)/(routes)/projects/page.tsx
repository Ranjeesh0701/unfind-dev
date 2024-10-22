import { auth } from "@/libs/auth";
import db from "@/libs/db";
import JobFilters from "./components/job-filters";
import JobList from "./components/job-list";

const Page = async () => {
  const session = await auth();

  const jobs = await db.project.findMany({
    where: {
      NOT: {
        userId: session?.user.id,
      },
    },
    include: {
      user: true,
      proposals: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const jobsPostedByCurrentUser = await db.project.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return (
    <div className="flex flex-row max-w-7xl mx-auto py-4 px-4 gap-6">
      <div className="hidden lg:block flex-[0.3]">
        <JobFilters />
      </div>
      <div className="flex-1 flex flex-col">
        <JobList jobs={jobs} />
      </div>
    </div>
  );
};

export default Page;
