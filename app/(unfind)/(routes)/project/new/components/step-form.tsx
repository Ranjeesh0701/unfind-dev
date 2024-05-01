"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/libs/utils";
import { ProjectRequest, ProjectValidator } from "@/libs/validators/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import NewProjectContext from "./context";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UploadDropzone } from "@/libs/uploadthing";
import axios from "axios";

type Step = {
  title: React.JSX.Element | string;
  description: React.JSX.Element | string;
  getChildren: (form: UseFormReturn<ProjectRequest>) => React.JSX.Element;
  buttonLabel: string;
  fields: (keyof ProjectRequest)[];
};

const steps: Step[] = [
  {
    title: <>Enter project name</>,
    description: (
      <>Choosing a compelling project name can attract top talent!</>
    ),
    buttonLabel: "Next",
    getChildren: (form: UseFormReturn<ProjectRequest>) => (
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormControl>
              <Input
                {...field}
                placeholder="e.g., Project Titan, Operation Phoenix, BlueSky Initiative"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    fields: ["title"],
  },
  {
    title: <>Enter a Project Description</>,
    description: (
      <>
        A detailed project description helps potential workers understand the
        scope and goals of your project.
      </>
    ),
    buttonLabel: "Next",
    getChildren: (form: UseFormReturn<ProjectRequest>) => (
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe your project briefly..."
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    fields: ["description"],
  },
  {
    title: <>Experience level</>,
    description: (
      <>
        Specify the level of experience required for the project. This ensures
        that candidates with the appropriate skill level are matched to the
        project.
      </>
    ),
    buttonLabel: "Next",
    getChildren: (form: UseFormReturn<ProjectRequest>) => (
      <FormField
        control={form.control}
        name="experienceLevel"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormControl>
              <RadioGroup
                className="flex"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormItem>
                  <FormControl>
                    <RadioGroupItem
                      className="w-32 h-32 rounded border-none bg-gray-200"
                      value="BEGINNER"
                      label="Beginner"
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormControl>
                    <RadioGroupItem
                      className="w-32 h-32 rounded border-none bg-gray-200"
                      value="INTERMEDIATE"
                      label="Intermediate"
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormControl>
                    <RadioGroupItem
                      className="w-32 h-32 rounded border-none bg-gray-200"
                      value="EXPERT"
                      label="Expert"
                    />
                  </FormControl>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    fields: ["experienceLevel"],
  },
  {
    title: <>Select Payment Method</>,
    description: (
      <>Choose how you'd like to compensate the talent: hourly or fixed rate.</>
    ),
    buttonLabel: "Next",
    getChildren: (form: UseFormReturn<ProjectRequest>) => (
      <FormField
        control={form.control}
        name="pricingScheme"
        render={({ field }) => (
          <div className="mb-6">
            <FormControl>
              <RadioGroup
                className="flex"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormItem>
                  <FormControl>
                    <RadioGroupItem
                      className="w-32 h-32 rounded border-none bg-gray-200"
                      value="HOURLY"
                      label="Hourly"
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormControl>
                    <RadioGroupItem
                      className="w-32 h-32 rounded border-none bg-gray-200"
                      value="FIXED"
                      label="Fixed"
                    />
                  </FormControl>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </div>
        )}
      />
    ),
    fields: ["pricingScheme"],
  },
  {
    title: <>Compensation</>,
    description: (
      <>Specify the compensation amount for the selected payment method.</>
    ),
    buttonLabel: "Next",
    getChildren: (form: UseFormReturn<ProjectRequest>) => (
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder={`${
                  form.getValues("pricingScheme") === "HOURLY" ? "/hr" : ""
                }`}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    fields: ["price"],
  },
  {
    title: <>Required Skills</>,
    description: (
      <>
        List the skills necessary for the project. This helps in finding the
        right candidates with the expertise needed to accomplish tasks
        effectively.
      </>
    ),
    buttonLabel: "Next",
    getChildren: (form: UseFormReturn<ProjectRequest>) => (
      <FormField
        control={form.control}
        name=""
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormControl>
              <Input {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    fields: [],
  },
  {
    title: <>Attach files</>,
    description: (
      <>
        Upload any relevant files or documents related to the project. This
        could include specifications, designs, examples, or any other resources
        that will help communicate the project requirements.
      </>
    ),
    buttonLabel: "Submit",
    getChildren: (form: UseFormReturn<ProjectRequest>) => (
      <FormField
        control={form.control}
        name=""
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormControl>
              <UploadDropzone endpoint="imageUploader" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    fields: [],
  },
];

const ProjectStepForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const date = new Date();
  date.setHours(date.getHours() + 1);

  const form = useForm<ProjectRequest>({
    resolver: zodResolver(ProjectValidator),
    defaultValues: {
      title: "",
      description: "",
      pricingScheme: "HOURLY",
      price: "",
      deadline: date,
      experienceLevel: "BEGINNER",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { trigger } = form;

  const onSubmit = async (values: ProjectRequest) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/socket/projects", values);
      form.reset();
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
      <form className="flex flex-col min-h-[calc(100vh-4rem)] xl:h-[calc(100vh-4rem)] w-full">
        <div className="py-10 px-4 sm:px-24 xl:px-48 flex-1 flex items-center justify-center xl:overflow-y-auto">
          <div className="flex flex-col w-full">
            {steps.map(
              (step, index) =>
                index === currentStep && (
                  <NewProjectContext
                    key={index}
                    title={step.title}
                    description={step.description}
                    buttonLabel={step.buttonLabel}
                    action={nextStep}
                  >
                    {step.getChildren(form)}
                  </NewProjectContext>
                )
            )}
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

export default ProjectStepForm;
