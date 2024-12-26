import NotFound from "@/components/not-found";
import StatusBar from "@/components/status-bar";
import { Button } from "@/components/ui/button";
import db from "@/libs/db";
import {
  ArrowLeft,
  Bookmark,
  ExternalLink,
  MoreHorizontal,
  Share,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import ProjectTabs from "./components/project-tabs";

type PageProps = {
  params: {
    project_id: string;
  };
  children: React.ReactNode;
};

const Page = async ({ params, children }: PageProps) => {
  const { project_id } = params;

  const project = await db.project.findFirst({
    where: {
      id: project_id,
    },
    include: {
      proposals: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!project) {
    return (
      <NotFound
        title="Project not found"
        description="Oops! It seems like the project you're looking for doesn't exist or may have been moved."
        showBackBtn
      />
    );
  }

  return (
    <div className="flex w-full gap-4">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <Link href={`/projects`}>
              <Button className="flex gap-2" size="sm" variant="outline">
                <ArrowLeft className="w-5 h-5" />
                <p>Back to all jobs</p>
              </Button>
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <Link href={`/projects/${project.id}`}>
              <Button className="flex gap-2" size="sm" variant="outline">
                <ExternalLink className="w-5 h-5" />
                <p>View details</p>
              </Button>
            </Link>
            <Button className="flex gap-2" size="icon" variant="outline">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="w-full rounded py-4 flex flex-col gap-4">
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">
                {project.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline">
                <Share className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {/* Status */}
          <div className="flex">
            <div className="flex flex-wrap gap-2 items-center">
              <StatusBar status={project.status} />
              <p className="text-sm text-gray-500">
                Posted at {project.createdAt.toDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ProjectTabs project_id={project.id} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Page;
