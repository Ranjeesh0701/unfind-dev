import Link from "next/link";
import OnboardingForm from "./components/form";

const Page = () => {
  return (
    <div className="h-screen xl:flex">
      <div className="flex-[0.4] bg-blue-200 px-8 py-4">
        <Link href="/" className="text-2xl">
          Unfind
        </Link>
      </div>
      <div className="flex-1 flex flex-col">
        <OnboardingForm />
      </div>
    </div>
  );
};

export default Page;
