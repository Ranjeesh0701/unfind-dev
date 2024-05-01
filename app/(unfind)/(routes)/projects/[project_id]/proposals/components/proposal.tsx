"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Proposal as ProposalType, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  proposal: ProposalType & {
    user: User;
  };
  postedByCurrentUser?: boolean;
};

const Proposal = ({ proposal, postedByCurrentUser }: Props) => {
  const router = useRouter();

  const onReject = async () => {
    await axios.patch(`/api/project/${proposal.projectId}/proposal`, {
      status: "REJECTED",
      userId: proposal.userId,
    });

    router.refresh();

    toast.success("Proposal rejected");
  };

  const onAccept = async () => {
    await axios.patch(`/api/project/${proposal.projectId}/proposal`, {
      status: "ACCEPTED",
      userId: proposal.userId,
    });

    router.refresh();

    toast.success("Proposal accepted");
  };

  return (
    <div className="bg-white border rounded px-6 py-6">
      <div className="flex items-center justify-center">
        <Avatar className="w-20 h-20 rounded-full">
          <AvatarImage
            src={proposal.user.image as string | undefined}
          ></AvatarImage>
          <AvatarFallback>{proposal.user.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-2 text-center py-4">
        <p className="font-bold text-xl text-clamp-1">{proposal.user.name}</p>
        <p className="text-clamp-1">{proposal.user.email}</p>
      </div>
      <div className="flex flex-col gap-4 justify-between">
        <div className="pb-2">
          <p className="line-clamp-1">{proposal.text}</p>
        </div>
        {postedByCurrentUser && (
          <div className="flex gap-2">
            {proposal.status === "OPEN" && (
              <>
                <Button onClick={onAccept} className="w-full">
                  Accept
                </Button>
                <Button
                  variant="destructive"
                  onClick={onReject}
                  className="w-full"
                >
                  Reject
                </Button>
              </>
            )}
            {proposal.status === "REJECTED" && (
              <Button
                variant="destructive"
                onClick={onReject}
                className="w-full"
                disabled={true}
              >
                Rejected
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposal;
