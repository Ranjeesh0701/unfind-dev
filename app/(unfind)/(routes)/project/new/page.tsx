import { getAuthSession } from "@/libs/auth";
import ProjectStepForm from "./components/step-form";

const page: React.FC = async () => {
  const session = await getAuthSession();

  return (
    <div className="flex">
      <ProjectStepForm />
    </div>
  );
};

export default page;
