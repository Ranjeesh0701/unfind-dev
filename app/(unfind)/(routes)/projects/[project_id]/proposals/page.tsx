import NotFound from "@/components/not-found";
import StatusBar from "@/components/status-bar";
import { getAuthSession } from "@/libs/auth";
import db from "@/libs/db";
import Proposal from "./components/proposal";

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
        <div className="bg-white w-full rounded-xl px-4 py-4 flex flex-col gap-4">
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">
                {project.title}
              </h3>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-bold text-gray-800">
                $ {project.price}
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
        </div>
        <div>
          <h3 className="py-4 text-xl font-bold">Proposals</h3>
        </div>
        <div>
          {project.proposals.length > 0 &&
            project.proposals.map((proposal, index) => (
              <Proposal
                key={index}
                proposal={proposal}
                postedByCurrentUser={postedByCurrentUser}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
