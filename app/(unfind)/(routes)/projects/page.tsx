import { getAuthSession } from "@/libs/auth";
import JobList from "./components/job-list";
import db from "@/libs/db";
import JobFilters from "./components/job-filters";
import SuggestedJobs from "./components/suggested-jobs";
import JobsPostedByUser from "./components/jobs-posted-by-user";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {
  const session = await getAuthSession();

  const jobs = await db.project.findMany({
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
    <div className="flex flex-row max-w-7xl mx-auto py-4 px-4 gap-4">
      <div className="hidden lg:block flex-[0.3]">
        <JobFilters />
      </div>
      <div className="flex-1">
        <JobList jobs={jobs} />
      </div>
    </div>
  );
};

export default Page;
