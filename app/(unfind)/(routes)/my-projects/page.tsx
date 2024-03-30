import db from "@/libs/db";
import JobList from "../projects/components/job-list";
import { getAuthSession } from "@/libs/auth";
import { redirect } from "next/navigation";
import JobFilters from "../projects/components/job-filters";

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
    <div className="flex max-w-4xl mx-auto">
      <JobList jobs={jobs} />
    </div>
  );
};

export default Page;
