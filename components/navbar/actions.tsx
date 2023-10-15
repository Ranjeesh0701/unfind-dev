"use client";

import { Bell, MessageSquare } from "lucide-react";
import Icon from "../ui/icon";
import { ICONSIZE } from "@/shared/size";

interface ActionsProps {}

const Actions: React.FC<ActionsProps> = ({}) => {
  return (
    <div className="flex items-center gap-4">
      <Icon
        icon={MessageSquare}
        pointer
        size={ICONSIZE.sm}
        style={{ strokeWidth: 1.5 }}
      />
      <Icon
        icon={Bell}
        pointer
        size={ICONSIZE.sm}
        style={{ strokeWidth: 1.5 }}
      />
    </div>
  );
};

export default Actions;
