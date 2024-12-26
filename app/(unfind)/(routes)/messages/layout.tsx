import ChatList from "@/components/chat/chat-list";
import { auth } from "@/libs/auth";
import db from "@/libs/db";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const session = await auth();

  const conversations = await db.conversation.findMany({
    where: {
      OR: [
        { initiatedById: session?.user.id },
        { receivedById: session?.user.id },
      ],
    },
    include: {
      initiatedBy: true,
      receivedBy: true,
      messages: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <div className="flex h-full bg-white">
      <div className="flex-[0.28]">
        <ChatList conversations={conversations} user={session?.user} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
