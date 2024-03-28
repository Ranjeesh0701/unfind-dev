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
    take: 4,
  });

  return (
    <div className="flex flex-row bg-gray-500/10">
      <div className="hidden sm:block w-[30%] sm:w-[40%] md:w-[30%] lg:w-[20%]">
        <JobFilters />
      </div>
      <div className="w-[100%] sm:w-[60%] md:w-[70%] lg:w-[60%] px-4 sm:px-0 pb-5 ">
        <JobList jobs={jobs} />
      </div>
      <div className="hidden lg:block w-[20%] px-6 mt-4">
        <div className="mb-4">
          <Button className="w-full" asChild>
            <Link href="/project/new">Post project</Link>
          </Button>
        </div>

        {jobsPostedByCurrentUser.length > 0 ? (
          <JobsPostedByUser jobs={jobsPostedByCurrentUser} />
        ) : (
          <SuggestedJobs />
        )}
      </div>
    </div>
  );
};

export default Page;
