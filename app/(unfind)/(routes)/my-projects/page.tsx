import { redirect } from "next/navigation";

import { getAuthSession } from "@/libs/auth";
import db from "@/libs/db";
import JobFilters from "../projects/components/job-filters";
import JobList from "../projects/components/job-list";

const Page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/users/sign-in");
  }

  const jobs = await db.project.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
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
