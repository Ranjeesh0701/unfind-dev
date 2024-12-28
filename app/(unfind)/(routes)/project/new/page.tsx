import { auth } from "@/libs/auth";
import ProjectStepForm from "./components/step-form";

const page: React.FC = async () => {
  const session = await auth();

  return (
    <div className="flex w-full">
      <ProjectStepForm />
    </div>
  );
};

export default page;
