import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import db from "@/libs/db";
import { Clock, MapPin, Trophy, Workflow } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    profileId: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { profileId } = params;

  const profile = await db.user.findFirst({
    where: {
      id: profileId,
    },
  });

  if (!profile) {
    return notFound();
  }

  return (
    <div className="py-4">
      <div className="flex flex-row">
        <div className="hidden lg:block w-[20%]"></div>
        <div className="w-[100%] lg:w-[70%] px-8 lg:px-0 pb-5">
          {/* Profile view */}
          <div className="flex gap-4 items-center">
            <div>
              <Avatar className="h-36 w-36">
                <AvatarImage src={profile.image as string | undefined} />
                <AvatarFallback>{profile.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="flex justify-between">
                <div>
                  <h3 className="text-2xl">{profile.name}</h3>
                  <div className="flex gap-2 py-2">
                    <MapPin className="w-5 h-5" />{" "}
                    <p className="text-sm">New york, USA</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="rounded-full">Edit profile</Button>
                  <Button className="rounded-full" variant="outline">
                    Public view
                  </Button>
                </div>
              </div>
              <div className="pt-2">
                <p className="line-clamp-2 leading-relaxed text-[15px]">
                  A software developer is a professional who specializes in
                  designing, coding, testing, and maintaining software systems.
                  With expertise in programming languages, development
                  frameworks, and software architecture, a software developer
                  plays a crucial role in creating and enhancing applications to
                  meet specific requirements.
                </p>
              </div>
            </div>
          </div>
          {/* Additional information */}
          <div className="flex pt-10 gap-16">
            <div className="flex gap-2">
              <Clock className="w-10 h-10" strokeWidth={1} />
              <div>
                <p className="font-semibold">3+ years</p>
                <p className="text-sm font-semibold text-gray-500">
                  Experienced
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Trophy className="w-10 h-10" strokeWidth={1} />
              <div>
                <p className="font-semibold">5 Certificates</p>
                <p className="text-sm font-semibold text-gray-500">Achieved</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Workflow className="w-10 h-10" strokeWidth={1} />
              <div>
                <p className="font-semibold">2 Internship</p>
                <p className="text-sm font-semibold text-gray-500">Completed</p>
              </div>
            </div>
          </div>

          {/* All information */}
          <Tabs defaultValue="experience" className="pt-10">
            <TabsList>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="biography">Biography</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>
            <TabsContent value="experience">My experience</TabsContent>
            <TabsContent value="biography">My biography</TabsContent>
            <TabsContent value="skills">My skills</TabsContent>
            <TabsContent value="portfolio">My portfolio</TabsContent>
          </Tabs>
          {/* End - all information */}
        </div>
        <div className="hidden lg:block w-[20%]"></div>
      </div>
    </div>
  );
};

export default Page;
