import NotFound from "@/components/not-found";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectWithUserDetailsAndProposals } from "@/types/project";
import { Search } from "lucide-react";
import Link from "next/link";
import Job from "./job";

interface JobListProps {
  jobs: ProjectWithUserDetailsAndProposals[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <>
      <div className="w-full relative bg-gradient-to-tr from-gray-500 to-gray-800 px-6 py-8 mb-4 rounded text-white">
        <h3 className="text-2xl">Discover Your Ideal Project</h3>
        <p className="text-sm pt-4">
          Search for Your Ideal Project in Web Development, Design, Writing, and
          More!
        </p>
        <div className="bg-white px-1 py-1 mt-4 rounded-full flex items-center z-10">
          <Search className="w-5 h-5 ml-4 text-black" />
          <Input
            placeholder="Search project"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 outline-none border-none text-black"
          />
          <Button className="bg-gray-700 hover:bg-gray-700/90">Search</Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg text-muted-foreground">{jobs.length} results</p>
        </div>
        <Link href="/project/new" className="pb-4">
          <Button className="w-auto" variant="outline">
            Post a project
          </Button>
        </Link>
      </div>
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <NotFound description="No projects posted yet" />
      )}
    </>
  );
};

export default JobList;
