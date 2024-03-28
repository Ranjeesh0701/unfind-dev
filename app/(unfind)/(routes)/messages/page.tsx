import { Lock, MessagesSquare } from "lucide-react";

const Page = () => {
  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center">
      <MessagesSquare className="w-24 h-24 text-gray-500" strokeWidth="1.2px" />
      <p className="font-semibold text-lg pt-4 text-gray-400">
        No chat selected
      </p>
      <p className="max-w-[200px] sm:max-w-[300px] text-center text-sm pt-4 text-gray-400">
        Please select an existing chat or start a new one with your connections
      </p>
      <div className="flex absolute bottom-6 px-4 py-2 rounded text-sm">
        <Lock className="w-4 h-4" />{" "}
        <p className="pl-3">
          Your chat messages are{" "}
          <span className="text-blue-500">end-to-end encrypted</span>
        </p>
      </div>
    </div>
  );
};

export default Page;
