"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { ProjectWithUserDetails } from "@/types/project";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const useProjectSocket = () => {
  const { socket } = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("project:new", (project: ProjectWithUserDetails) => {
      toast(`${project.title}`, {
        description: project.description,
        action: {
          label: "View",
          onClick: () => router.push(`/projects/${project.id}`),
        },
      });
    });

    return () => {
      socket.off("project:new");
    };
  }, [socket]);
};
