"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ProposalRequest, ProposalValidator } from "@/libs/validators/proposal";
import axios from "axios";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ApplyProjectFormProps {
  projectId: string;
}

const ApplyProjectForm: React.FC<ApplyProjectFormProps> = ({ projectId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ProposalRequest>({
    resolver: zodResolver(ProposalValidator),
    defaultValues: {
      text: "",
      projectId,
    },
  });

  const onSubmit = async (values: ProposalRequest) => {
    try {
      setIsLoading(true);
      await axios.post("/api/project/propose", values);

      form.reset();
      toast.success("Proposal sent successfully.");
      router.refresh();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormMessage />
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="What makes you best for this project?"
                    rows={4}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mt-3 flex justify-end">
            <Button
              type="submit"
              onClick={() => onSubmit(form.getValues())}
              disabled={isLoading}
            >
              Send proposal <Send className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ApplyProjectForm;
