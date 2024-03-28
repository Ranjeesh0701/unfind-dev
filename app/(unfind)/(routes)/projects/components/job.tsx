import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/libs/utils";
import { ProjectWithUserDetails } from "@/types/project";
import {
  Clock,
  FolderOpenDot,
  Map,
  MoreVertical,
  ShieldHalf,
  Users,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";

interface JobProps {
  job: ProjectWithUserDetails;
}

const Job: React.FC<JobProps> = ({ job }) => {
  const postedAt = moment(job.createdAt).format("Do MMM YY");

  return (
    <div className="flex flex-col border w-full px-6 py-6 rounded">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={job.user.image as string | undefined} />
            <AvatarFallback>{job.user.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex gap-4">
            <div>
              <p className="font-bold text-sm">{job.title}</p>
              <p className="text-gray-500 text-sm">America</p>
            </div>
            <div>
              <Badge variant="success">{job.status}</Badge>
            </div>
          </div>
        </div>
        <MoreVertical />
      </div>
      <div className="pt-4 sm:flex justify-between">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-8 overflow-x-auto no-scrollbar">
          <div className="flex gap-1 items-center text-sm text-gray-700">
            <ShieldHalf className="w-4 h-4" />
            <p className="capitalize font-semibold">
              {job.experienceLevel.toLowerCase()}
            </p>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-700">
            <Map className="w-4 h-4" />
            <p className="capitalize font-semibold">Remote project</p>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-700">
            <Clock className="w-4 h-4" />
            <p className="capitalize font-semibold">Active 1 mo ago</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm pt-2 sm:pt-0">
          <span className="sm:hidden">Posted on </span>
          {postedAt}
        </p>
      </div>
      <div className="py-4">
        <p className="text-sm text-gray-500">{job.description}</p>
      </div>
      <Separator />
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex w-full sm:w-auto gap-4 sm:gap-12">
          <div className="flex items-center gap-2">
            <FolderOpenDot className="w-5 h-5 text-blue-500" />
            <p className="font-bold">
              ${job.price}
              <span className="font-normal text-sm ml-1 text-gray-500">
                /hr
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            <p className="font-bold">
              0
              <span className="font-normal text-sm ml-1 text-gray-500">
                proposals
              </span>
            </p>
          </div>
        </div>
        <Link
          className={cn(
            buttonVariants({ size: "sm" }),
            "w-full sm:w-auto mt-4 sm:mt-0"
          )}
          href={`/projects/${job.id}`}
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default Job;
