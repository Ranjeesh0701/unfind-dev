import { Clock, Edit, Locate, MailCheck, Map } from "lucide-react";

import Heading from "@/components/heading";
import NotFound from "@/components/not-found";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auth } from "@/libs/auth";
import db from "@/libs/db";
import Link from "next/link";
import ApplyProjectForm from "./components/form";

interface PageProps {
  params: {
    project_id: string;
  };
}

const page: React.FC<PageProps> = async ({ params }) => {
  const { project_id } = params;

  const session = await auth();

  const project = await db.project.findFirst({
    where: {
      id: project_id,
    },
    include: {
      proposals: true,
    },
  });

  const proposalByCurrentUser = project?.proposals.find(
    (proposal) => proposal.userId === session?.user.id
  );

  const isAlreadyProposed = !!proposalByCurrentUser;

  const isSameUser = session?.user.id === project?.userId;

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
    <div className="flex gap-4">
      {/* Project details */}
      <div className="flex-1">
        <div className="pb-4 flex flex-col gap-4">
          <div className="rounded-t flex flex-col gap-4">
            {/* Description */}
            <div className="flex">
              <p>{project.description}</p>
            </div>
            {/* Categories */}
            <div className="flex"></div>
            {/* About the project */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">About the project</h3>
                {isSameUser ? (
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    size="xs"
                  >
                    <Edit className="h-4 w-4" />
                    <p className="text-xs">Edit project</p>
                  </Button>
                ) : isAlreadyProposed ? (
                  <Badge variant="success">Already proposed</Badge>
                ) : null}
              </div>
              <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2">
                  <MailCheck />
                  <Link
                    href={`/projects/${project.id}/proposals`}
                    className="text-blue-600 underline"
                  >
                    <p className="text-sm">
                      {project.proposals.length || 0} Proposals
                    </p>
                  </Link>
                </div>
                <div className="flex gap-2">
                  <Map />
                  <p className="text-sm">Remote project</p>
                </div>
                <div className="flex gap-2">
                  <Clock />
                  <p className="text-sm">Active 1 mo ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Send a proposal for project */}
          {!isSameUser && !isAlreadyProposed ? (
            <div className="border-t rounded-b bg-white p-4 flex flex-col gap-4">
              <Heading title="Write a proposal" />
              <ApplyProjectForm projectId={project_id} />
            </div>
          ) : null}
        </div>
      </div>
      <div className="hidden lg:block flex-[0.3]">
        <div className="bg-sidebar rounded border px-4 py-4">
          <p className="font-bold text-lg">About the client</p>
          <div className="pt-4 flex flex-col gap-2">
            <div className="flex gap-2">
              <Locate />
              <p>United states</p>
            </div>
            <div className="flex gap-2">
              <Clock />
              <p>Member since Mar 29, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
