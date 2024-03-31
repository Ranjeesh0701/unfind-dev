"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Proposal, User } from "@prisma/client";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  proposal: Proposal & {
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
    <div className="bg-white rounded-xl px-4 py-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div>
            <Avatar className="w-20 h-20 rounded-md">
              <AvatarImage
                src={proposal.user.image as string | undefined}
              ></AvatarImage>
              <AvatarFallback>{proposal.user.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-xl">{proposal.user.name}</p>
            <p className="">{proposal.user.email}</p>
          </div>
        </div>
        <div>
          <MoreHorizontal className="cursor-pointer" />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="pt-4">
          <p>{proposal.text}</p>
        </div>
        {postedByCurrentUser && (
          <div className="flex gap-2">
            {proposal.status === "OPEN" && (
              <>
                <Button onClick={onAccept}>Accept</Button>
                <Button variant="destructive" onClick={onReject}>
                  Reject
                </Button>
              </>
            )}
            {proposal.status === "REJECTED" && (
              <div className="bg-destructive capitalize text-white hover:bg-destructive/90 transition rounded-full text-sm flex items-center justify-between px-4 py-1">
                {proposal.status.toLowerCase()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposal;
