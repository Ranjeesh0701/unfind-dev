"use client";

import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/libs/utils";
import {
  OnboardingRequest,
  OnboardingValidator,
} from "@/libs/validators/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";

import OnboardingContext from "./context";

type Step = {
  title: React.JSX.Element | string;
  description: React.JSX.Element | string;
  getChildren: (form: UseFormReturn<OnboardingRequest>) => React.JSX.Element;
  buttonLabel: string;
  fields: (keyof OnboardingRequest)[];
};

const steps: Step[] = [
  {
    title: (
      <>
        Your Account is Ready. <br /> Let&apos;s Go!
      </>
    ),
    description: (
      <>
        Enter essential information to complete your setup and unlock full
        access to your <span className="font-bold">freelance</span> account—your
        gateway to endless opportunities and success.
      </>
    ),
    buttonLabel: "Get Started",
    getChildren: () => <></>,
    fields: [],
  },
  {
    title: <>Claim Your Identity: Choose Your Username</>,
    description: (
      <>
        Personalize your freelancing journey by choosing a{" "}
        <span className="font-bold">unique username</span>—reflecting your
        individuality and setting the stage for a standout presence on our
        platform.
      </>
    ),
    buttonLabel: "Next",
    getChildren: (form: UseFormReturn<OnboardingRequest>) => (
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormControl>
              <Input {...field} placeholder="Your name" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    fields: ["username"],
  },
  {
    title: <>Define Your Freelance Horizon.</>,
    description: (
      <>
        Set your location to refine your freelancing journey and connect with
        opportunities aligned to your geographic preferences.
      </>
    ),
    buttonLabel: "Submit",
    getChildren: (form: UseFormReturn<OnboardingRequest>) => (
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormControl>
              <Input {...field} placeholder="Your location" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    fields: ["location"],
  },
];

const OnboardingForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<OnboardingRequest>({
    resolver: zodResolver(OnboardingValidator),
    defaultValues: {
      location: "",
      username: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { trigger } = form;

  const onSubmit = async (values: OnboardingRequest) => {
    try {
      setIsLoading(true);
      await axios.post("/api/profile", values);
      router.push("/feed");
    } catch (error) {
      // TODO: handle error creating project
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    const output = await trigger(steps[currentStep].fields || []);

    if (!output) {
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((currentStep) => currentStep + 1);
    }

    if (currentStep === steps.length - 1) {
      onSubmit(form.getValues());
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((currentStep) => currentStep - 1);
    }
  };

  useEffect(() => {
    const transitionToNextStepOnEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        nextStep();
      }
    };

    document.addEventListener("keypress", transitionToNextStepOnEnter);

    return () => {
      document.removeEventListener("keypress", transitionToNextStepOnEnter);
    };
  }, [currentStep, nextStep]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col h-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="py-10 px-4 sm:px-24 xl:px-48 flex-1 flex items-center justify-center xl:overflow-y-auto">
          <div className="flex flex-col">
            {steps.map(
              (step, index) =>
                index === currentStep && (
                  <OnboardingContext
                    key={index}
                    title={step.title}
                    description={step.description}
                    buttonLabel={step.buttonLabel}
                    action={nextStep}
                    disabled={isLoading}
                  >
                    {step.getChildren(form)}
                  </OnboardingContext>
                )
            )}
            {/* {step === 0 && (
              <OnboardingContext
                title={
                  <>
                    Your Account is Ready. <br /> Let&apos;s Go!
                  </>
                }
                description={
                  <>
                    Enter essential information to complete your setup and
                    unlock full access to your{" "}
                    <span className="font-bold">freelance</span> account—your
                    gateway to endless opportunities and success.
                  </>
                }
                buttonLabel="Get Started"
                action={nextStep}
              ></OnboardingContext>
            )}
            {step === 1 && (
              <OnboardingContext
                title={<>Claim Your Identity: Choose Your Username</>}
                description={
                  <>
                    Personalize your freelancing journey by choosing a{" "}
                    <span className="font-bold">unique username</span>
                    —reflecting your individuality and setting the stage for a
                    standout presence on our platform.
                  </>
                }
                buttonLabel="Next"
                action={nextStep}
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormControl>
                        <Input {...field} placeholder="Your name" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </OnboardingContext>
            )}
            {step === 2 && (
              <OnboardingContext
                title="Define Your Freelance Horizon."
                description="
                  Set your location to refine your freelancing journey and
                  connect with opportunities aligned to your geographic
                  preferences.
              "
                buttonLabel="Submit"
                action={nextStep}
              >
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your location"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </OnboardingContext>
            )} */}
            {/* {step === 3 && (
              <OnboardingContext
                title="Your Freelance Choice: Work or Hire?"
                description={
                  <>
                    Define your freelancing path by selecting whether you want
                    to offer your skills or find the perfect talent—setting the
                    stage for a personalized experience on our platform.{" "}
                    <span className="font-bold">
                      This can be changed later.
                    </span>
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
            )} */}
          </div>
        </div>
        <div className="px-4 sm:px-24 xl:px-48">
          <Progress
            value={(currentStep / (steps.length - 1)) * 100}
            className="h-3"
          />
          <div className="flex py-6">
            <div className="ml-auto flex gap-4">
              <div
                className={cn(
                  "border-2 border-gray-900 cursor-pointer rounded-full p-3",
                  {
                    "border-gray-300 cursor-not-allowed": currentStep === 0,
                  }
                )}
                onClick={prevStep}
              >
                <ArrowLeft
                  className={cn({
                    "text-gray-300": currentStep === 0,
                  })}
                />
              </div>
              <div
                className={cn(
                  "border-2 border-gray-900 cursor-pointer rounded-full p-3",
                  {
                    "border-gray-300 cursor-not-allowed":
                      currentStep === steps.length - 1,
                  }
                )}
                onClick={nextStep}
              >
                <ArrowRight
                  className={cn({
                    "text-gray-300": currentStep === steps.length - 1,
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default OnboardingForm;
