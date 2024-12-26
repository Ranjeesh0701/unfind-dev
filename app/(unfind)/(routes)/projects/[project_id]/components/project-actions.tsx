"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, Share } from "lucide-react";
import { toast } from "sonner";

type ProjectActionsProps = {
  projectId: string;
};

const ProjectActions = ({ projectId }: ProjectActionsProps) => {
  const onShareProject = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/projects/${projectId}`
    );

    toast.success("Project URL copied! Share it to spread the word.");
  };

  return (
    <div className="flex items-center gap-2">
      <Button size="icon" variant="outline" onClick={onShareProject}>
        <Share className="h-5 w-5" />
      </Button>
      <Button size="icon" variant="outline">
        <Bookmark className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ProjectActions;
