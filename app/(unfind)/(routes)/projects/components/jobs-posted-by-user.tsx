"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { ICONSIZE } from "@/shared/size";
import { ProjectWithUserDetails } from "@/types/project";
import { ArrowRight, Dot, FolderKanban, MoreHorizontal } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";

interface JobsPostedByUserProps {
  jobs: ProjectWithUserDetails[];
}

const JobsPostedByUser: React.FC<JobsPostedByUserProps> = ({ jobs }) => {
  const router = useRouter();
  return (
    <>
      <div className="rounded-xl bg-white px-4 py-2">
        <div className="flex items-center justify-between">
          <p className="font-bold py-2">Projects posted by you</p>
          <ArrowRight
            className="h-5 w-5 cursor-pointer"
            onClick={() => router.push("/my-projects")}
          />
        </div>

        {jobs.map((job, index) => (
          <>
            <div className="rounded py-4" key={job.id}>
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold line-clamp-1">{job.title}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-6 w-56">
                    <DropdownMenuItem
                      onClick={() => router.push(`/projects/${job.id}`)}
                    >
                      <Icon
                        size={ICONSIZE.xs}
                        icon={FolderKanban}
                        label="View project"
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <p className="text-sm text-gray-500 pt-3 line-clamp-2">
                  {job.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center pt-2">
                <p className="text-sm text-gray-500">
                  {moment(job.createdAt, "YYYYMMDD").fromNow()}
                </p>
                <Dot className="w-5 h-5 hidden sm:block text-gray-500" />
                <p className="text-sm text-gray-500">0 proposals</p>
              </div>
            </div>

            {index < jobs.length - 1 && <Separator />}
          </>
        ))}
      </div>
    </>
  );
};

export default JobsPostedByUser;
