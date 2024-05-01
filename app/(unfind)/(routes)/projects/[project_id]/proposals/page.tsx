import NotFound from "@/components/not-found";
import StatusBar from "@/components/status-bar";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/libs/auth";
import db from "@/libs/db";
import {
  ArrowLeft,
  Bookmark,
  ExternalLink,
  Heart,
  MoreHorizontal,
} from "lucide-react";
import Proposal from "./components/proposal";
import Link from "next/link";

type PageProps = {
  params: {
    project_id: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const { project_id } = params;

  const session = await getAuthSession();

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

  const postedByCurrentUser = project?.userId === session?.user.id;

  return (
    <div className="flex flex-row max-w-7xl mx-auto py-4 px-4 gap-4">
      <div className="w-full">
        <div className="grid grid-cols-4 gap-4">
          {project.proposals.length > 0 &&
            project.proposals.map((proposal, index) => (
              <Proposal
                key={index}
                proposal={proposal}
                postedByCurrentUser={postedByCurrentUser}
              />
            ))}
        </div>
        {project.proposals.length === 0 && (
          <NotFound description="No proposals yet." />
        )}
      </div>
    </div>
  );
};

export default Page;
