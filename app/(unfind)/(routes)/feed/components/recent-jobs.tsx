"use client";

import Heading from "@/components/heading";
import { ProjectWithUserDetails } from "@/types/project";
import Job from "./job";

interface RecentJobsProps {
  recentJobs: ProjectWithUserDetails[];
}

const RecentJobs: React.FC<RecentJobsProps> = ({ recentJobs }) => {
  return (
    <div className="pt-8">
      <Heading title="Recent Jobs" />
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
          {recentJobs.map((job) => (
            <Job
              key={job.id}
              category={[
                "Software development",
                "Javascript",
                "Tailwind",
                "Next js",
                "React Js",
              ]}
              location="United States"
              verified
              job={job}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentJobs;
