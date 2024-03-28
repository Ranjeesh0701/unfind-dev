"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import axios from "axios";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithPresets } from "@/components/ui/date-picker";
import { ProjectRequest, ProjectValidator } from "@/libs/validators/project";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const PostProjectForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const date = new Date();
  date.setHours(date.getHours() + 1);

  const form = useForm<ProjectRequest>({
    resolver: zodResolver(ProjectValidator),
    defaultValues: {
      title: "",
      description: "",
      pricingScheme: "HOURLY",
      price: 10,
      deadline: date,
      experienceLevel: "BEGINNER",
    },
  });

  const onSubmit = async (values: ProjectRequest) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/socket/projects", values);
      form.reset();
      router.push(`/project/${data.id}`);
    } catch (error) {
      // TODO: handle error creating project
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-[100%] sm:w-[60%] md:w-[70%] lg:w-[60%] px-4 sm:px-0">
        <div className="pt-4">
          <Heading title="Post a Project" />
        </div>
        <div className="pt-4">
          <Form {...form}>
            <form
              className="border rounded-lg px-8 py-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Title</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Software developer..."
                        className="focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-1"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Description</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Develop an application with Next js..."
                        className="focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-1"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pricingScheme"
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Pricing</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pricing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HOURLY">Hourly</SelectItem>
                          <SelectItem value="FIXED">Fixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Price</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Price paid for the project"
                        className="focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-1"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Deadline</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <DatePickerWithPresets
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Experience level required</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Experience Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BEGINNER">Beginner</SelectItem>
                          <SelectItem value="INTERMEDIATE">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="EXPERT">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
      <div className="lg:block w-[20%]">
        <div className="h-full px-6 pt-4">
          <div className="flex flex-col gap-4">
            <div className="border rounded p-4 flex flex-col gap-4 items-center">
              <div className="border-2 border-dashed bg-gray-50 hover:bg-gray-100 w-full rounded-md px-4 py-4 flex gap-2 justify-center cursor-pointer">
                <div>
                  <Icon icon={BsBoxArrowUpRight} />
                </div>
                <div>Preview</div>
              </div>
              <div className="flex flex-col w-full gap-4">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  className="w-full"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostProjectForm;
