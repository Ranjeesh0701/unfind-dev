"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/libs/utils";
import OnboardingContext from "./context";

const OnboardingForm = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <>
      <div className="py-10 px-4 sm:px-24 xl:px-48 flex-1 flex items-center justify-center xl:overflow-y-auto">
        <div className="flex flex-col">
          {page === 0 && (
            <OnboardingContext
              title={
                <>
                  Your Account is Ready. <br /> Let's Go!
                </>
              }
              description={
                <>
                  Enter essential information to complete your setup and unlock
                  full access to your{" "}
                  <span className="font-bold">freelance</span> account—your
                  gateway to endless opportunities and success.
                </>
              }
              buttonLabel="Get Started"
              action={() => setPage(1)}
            ></OnboardingContext>
          )}
          {page === 1 && (
            <OnboardingContext
              title={<>Claim Your Identity: Choose Your Username</>}
              description={
                <>
                  Personalize your freelancing journey by choosing a{" "}
                  <span className="font-bold">unique username</span>—reflecting
                  your individuality and setting the stage for a standout
                  presence on our platform.
                </>
              }
              buttonLabel="Next"
              action={() => setPage(2)}
            >
              <Input className="mb-6" placeholder="Your name" />
            </OnboardingContext>
          )}
          {page === 2 && (
            <OnboardingContext
              title="Define Your Freelance Horizon."
              description="
                  Set your location to refine your freelancing journey and
                  connect with opportunities aligned to your geographic
                  preferences.
              "
              buttonLabel="Next"
              action={() => setPage(3)}
            >
              <Input className="mb-6" placeholder="Your location" />
            </OnboardingContext>
          )}
          {page === 3 && (
            <OnboardingContext
              title="Your Freelance Choice: Work or Hire?"
              description={
                <>
                  Define your freelancing path by selecting whether you want to
                  offer your skills or find the perfect talent—setting the stage
                  for a personalized experience on our platform.{" "}
                  <span className="font-bold">This can be changed later.</span>
                </>
              }
              buttonLabel="Submit"
              action={() => {}}
            >
              <div className="mb-6">
                <RadioGroup className="flex">
                  <RadioGroupItem
                    className="w-32 h-32 rounded border-none bg-gray-200"
                    value="Work"
                    label="Work"
                  />
                  <RadioGroupItem
                    className="w-32 h-32 rounded border-none bg-gray-200"
                    value="Hire"
                    label="Hire"
                  />
                </RadioGroup>
              </div>
            </OnboardingContext>
          )}
        </div>
      </div>
      <div className="px-4 sm:px-24 xl:px-48">
        <Progress value={60} className="h-3" />
        <div className="flex py-6">
          <div className="ml-auto flex gap-4">
            <div
              className={cn(
                "border-2 border-gray-900 cursor-pointer rounded-full p-3",
                {
                  "border-gray-300 cursor-not-allowed": page === 0,
                }
              )}
              onClick={() => page > 0 && setPage((page) => page - 1)}
            >
              <ArrowLeft
                className={cn({
                  "text-gray-300": page === 0,
                })}
              />
            </div>
            <div
              className={cn(
                "border-2 border-gray-900 cursor-pointer rounded-full p-3",
                {
                  "border-gray-300 cursor-not-allowed": page === 3,
                }
              )}
              onClick={() => page < 3 && setPage((page) => page + 1)}
            >
              <ArrowRight
                className={cn({
                  "text-gray-300": page === 3,
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingForm;
