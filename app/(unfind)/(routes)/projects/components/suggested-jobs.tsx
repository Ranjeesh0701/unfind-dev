import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const SuggestedJobs = () => {
  return (
    <div className="px-6">
      <div className="border rounded mt-4 px-4 py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold py-2">Suggested Project</p>
          <Info className="h-4 w-4" />
        </div>
      </div>
      <div className="border rounded mt-4 px-4 py-4">
        <p className="text-sm text-center text-gray-500">
          No suggested projects
        </p>
      </div>
    </div>
  );
};

export default SuggestedJobs;
