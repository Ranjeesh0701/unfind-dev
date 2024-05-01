"use client";

import { cn } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProjectTabsProps {
  project_id: string;
}

const ProjectTabs = ({ project_id }: ProjectTabsProps) => {
  const pathname = usePathname();

  return (
    <ul
      className="flex flex-wrap -mb-px text-sm font-medium text-center"
      id="default-tab"
      data-tabs-toggle="#default-tab-content"
      role="tablist"
    >
      <li className="me-2" role="presentation">
        <Link
          href={`/projects/${project_id}`}
          className={cn(
            "inline-block text-gray-400 p-4 border-b-2 rounded-t-lg cursor-pointer",
            {
              "text-black border-black": pathname === `/projects/${project_id}`,
            }
          )}
          id="profile-tab"
          data-tabs-target="#profile"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          Details
        </Link>
      </li>
      <li className="me-2" role="presentation">
        <Link
          href={`/projects/${project_id}/proposals`}
          className={cn(
            "inline-block text-gray-400 p-4 border-b-2 rounded-t-lg cursor-pointer",
            {
              "text-black border-black":
                pathname === `/projects/${project_id}/proposals`,
            }
          )}
          id="profile-tab"
          data-tabs-target="#profile"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          Proposals
        </Link>
      </li>
    </ul>
  );
};

export default ProjectTabs;
