"use client";

import { Bell, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

import { ICONSIZE } from "@/shared/size";
import Icon from "../ui/icon";

interface ActionsProps {}

const Actions: React.FC<ActionsProps> = ({}) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <Icon
        icon={MessageSquare}
        pointer
        size={ICONSIZE.sm}
        style={{ strokeWidth: 1.5 }}
        onClick={() => router.push("/messages")}
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
