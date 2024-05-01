"use client";

import { ArrowRight, Ghost } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";

interface NotFoundParams {
  title?: string;
  description?: string;
  showBackBtn?: boolean;
  small?: boolean;
}

const NotFound: React.FC<NotFoundParams> = ({
  title,
  description,
  showBackBtn,
  small,
}) => {
  const router = useRouter();

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <Ghost className="h-24 w-24" />
        <div className="flex flex-col justify-center items-center max-w-md text-center">
          {title ? (
            <h3
              className={cn("text-4xl font-bold uppercase", {
                "text-xl": small,
              })}
            >
              {title}
            </h3>
          ) : null}
          {description ? (
            <p className="pt-4 text-gray-500">{description}</p>
          ) : null}
        </div>
        {showBackBtn ? (
          <Button onClick={() => router.back()}>
            Back to home <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default NotFound;
