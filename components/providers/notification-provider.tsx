"use client";

import { useProjectSocket } from "@/hooks/use-project-socket";

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  useProjectSocket();

  return <>{children}</>;
};

export default NotificationProvider;
