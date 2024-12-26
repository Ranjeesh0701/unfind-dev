"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { ICONSIZE } from "@/shared/size";
import { ProjectWithUserDetails } from "@/types/project";
import Link from "next/link";
import { AiOutlineShareAlt, AiOutlineUser } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { toast } from "sonner";

interface JobProps {
  category: string[];
  verified?: boolean;
  location?: string;
  job: ProjectWithUserDetails;
}

const Job: React.FC<JobProps> = ({ category, verified, location, job }) => {
  const onShareProject = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/projects/${job.id}`
    );

    toast.success("Project URL copied! Share it to spread the word.");
  };

  return (
    <div className="rounded-xl bg-white p-2 border">
      <div className="flex gap-4 h-full">
        <div className="flex flex-col overflow-hidden w-full">
          <div className="bg-sidebar h-full px-4 py-8 rounded-md flex flex-col">
            <div className="flex items-center justify-between pb-4">
              <div className="text-sm font-semibold">$ {job.price} / hr</div>
              <div className="flex items-center gap-2">
                {job.experienceLevel && (
                  <div className="text-xs bg-green-200 px-2 py-1 rounded font-bold border">
                    {job.experienceLevel}
                  </div>
                )}
                <Icon
                  icon={AiOutlineShareAlt}
                  size={ICONSIZE.md}
                  pointer
                  onClick={onShareProject}
                />
                <Icon icon={BsBookmark} pointer size={ICONSIZE.md} />
              </div>
            </div>
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="text-xl">{job.title}</div>
                <div>
                  <div className="text-sm pt-1 line-clamp-3">
                    {job.description}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2">
                {category.length > 0 &&
                  category.map((_c, _i: number) => (
                    <div
                      key={_i}
                      className="border border-[#464646] rounded-full px-2 py-1 text-xs whitespace-nowrap"
                    >
                      {_c}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="pt-2 flex flex-row gap-2 overflow-x-scroll no-scrollbar">
            <div className="bg-sidebar w-auto px-2 py-1.5 rounded-lg flex items-center gap-2">
              <div>
                <Icon icon={AiOutlineUser} size={16} />
              </div>
              <div className="text-xs font-semibold whitespace-nowrap">
                Payment Verified
              </div>
              <div className="rounded-full flex items-center justify-center">
                {verified ? (
                  <Icon icon={MdVerified} color="#29b0ff" size={17} />
                ) : (
                  <Icon icon={GoUnverified} size={16} />
                )}
              </div>
            </div>
            {location && (
              <div className="bg-sidebar w-auto px-2 py-1.5 rounded-lg flex items-center gap-2">
                <div>
                  <Icon icon={CiLocationOn} size={16} />
                </div>
                <div className="text-xs font-semibold whitespace-nowrap">
                  {location}
                </div>
              </div>
            )}
          </div>
          <div className="py-2 flex items-center justify-between">
            <div>
              <Avatar>
                <AvatarImage src={job.user.image as string | undefined} />
                <AvatarFallback>{job.user.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <Link
                href={`/projects/${job.id}`}
                className="bg-muted-foreground text-white text-sm font-semibold px-4 py-2 rounded-full"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
