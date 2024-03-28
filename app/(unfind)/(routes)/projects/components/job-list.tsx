import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectWithUserDetails } from "@/types/project";
import { Search } from "lucide-react";
import Job from "./job";

interface JobListProps {
  jobs: ProjectWithUserDetails[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div>
      <div className="w-full bg-gradient-to-tr from-gray-500 to-gray-800 px-6 py-8 my-4 rounded text-white">
        <h3 className="text-xl font-bold">Discover Your Ideal Project</h3>
        <p className="text-sm pt-4">
          Search for Your Ideal Project in Web Development, Design, Writing, and
          More!
        </p>
        <div className="bg-white px-1 py-1 mt-4 rounded flex items-center">
          <Search className="w-5 h-5 ml-4 text-black" />
          <Input
            placeholder="Search project"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 outline-none border-none text-black"
          />
          <Button className="bg-gray-700 hover:bg-gray-700/90">Search</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <Job key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
