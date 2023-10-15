"use client";

import { Bell, MessageSquare } from "lucide-react";
import Icon from "../ui/icon";
import { ICONSIZE } from "@/shared/size";

interface ActionsProps {}

const Actions: React.FC<ActionsProps> = ({}) => {
  return (
    <div className="flex items-center gap-4">
      <Icon icon={MessageSquare} pointer size={ICONSIZE.sm} />
      <Icon icon={Bell} pointer size={ICONSIZE.sm} />
    </div>
  );
};

export default Actions;
