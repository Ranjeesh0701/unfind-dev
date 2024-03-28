import { Clock, Edit, MailCheck, Map } from "lucide-react";

import Heading from "@/components/heading";
import Infobar from "@/components/infobar";
import NotFound from "@/components/not-found";
import Sidebar from "@/components/sidebar";
import StatusBar from "@/components/status-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/libs/auth";
import db from "@/libs/db";
import ApplyProjectForm from "./components/form";

interface PageProps {
  params: {
    project_id: string;
  };
}

const page: React.FC<PageProps> = async ({ params }) => {
  const { project_id } = params;

  const session = await getAuthSession();

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
    <div>
      <div>
        <div className="flex flex-row">
          <div className="hidden sm:block w-[30%] sm:w-[40%] md:w-[30%] lg:w-[20%]">
            <Sidebar user={session?.user} />
          </div>

          {/* Project details */}
          <div className="w-[100%] sm:w-[60%] md:w-[70%] lg:w-[60%] px-4 sm:px-0">
            <div className="pt-4 pb-4">
              <div className="border rounded-t p-4 flex flex-col gap-4">
                {/* Title */}
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">
                      {project.title}
                    </h3>
                  </div>
                  <div>
                    <p className="text-xl sm:text-3xl font-bold text-gray-800">
                      ${project.price} USD
                    </p>
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
                      <p className="text-sm">
                        {project.proposals.length || 0} Proposals
                      </p>
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
                <div className="border rounded-b p-4 flex flex-col gap-4">
                  <Heading title="Write a proposal" />
                  <ApplyProjectForm projectId={project_id} />
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-[20%] hidden sm:block">
            <Infobar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
