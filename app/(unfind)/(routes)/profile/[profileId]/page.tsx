import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import db from "@/libs/db";
import { Book, Briefcase, FileStack, MapPin, Plus, Users } from "lucide-react";
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
    <div className="h-full flex flex-col">
      {/* Profile view */}
      <div className="flex gap-4 items-center">
        <div>
          <Avatar className="h-28 w-28 !rounded-sm">
            <AvatarImage src={profile.image as string | undefined} />
            <AvatarFallback className="!rounded-sm">
              {profile.name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl">{profile.name}</h3>
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
            <p className="line-clamp-2 leading-relaxed text-sm">
              A software developer is a professional who specializes in
              designing, coding, testing, and maintaining software systems. With
              expertise in programming languages, development frameworks, and
              software architecture, a software developer plays a crucial role
              in creating and enhancing applications to meet specific
              requirements.
            </p>
          </div>
        </div>
      </div>

      {/* All information */}
      <Tabs defaultValue="experience" className="pt-10 flex-1 flex flex-col">
        <TabsList>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>
        <TabsContent
          value="experience"
          className="bg-sidebar border flex-1 rounded-sm"
        >
          <div className="flex items-center justify-between border-b p-2">
            <span className="flex gap-2 items-center">
              <Briefcase className="h-4 w-4" />
              <p>Job experience</p>
            </span>
            <Button
              className="flex gap-2 rounded-full text-xs"
              size="xs"
              variant="secondary"
            >
              <Plus className="h-3 w-3" />
              Add more
            </Button>
          </div>
        </TabsContent>
        <TabsContent
          value="education"
          className="bg-sidebar border flex-1 rounded-sm"
        >
          <div className="flex items-center justify-between border-b p-2">
            <span className="flex gap-2 items-center">
              <Book className="h-4 w-4" />
              <p>Education</p>
            </span>
            <Button
              className="flex gap-2 rounded-full text-xs"
              size="xs"
              variant="secondary"
            >
              <Plus className="h-3 w-3" />
              Add more
            </Button>
          </div>
        </TabsContent>
        <TabsContent
          value="portfolio"
          className="bg-sidebar border flex-1 rounded-sm"
        >
          <div className="flex items-center justify-between border-b p-2">
            <span className="flex gap-2 items-center">
              <FileStack className="h-4 w-4" />
              <p>Portfolio</p>
            </span>
            <Button
              className="flex gap-2 rounded-full text-xs"
              size="xs"
              variant="secondary"
            >
              <Plus className="h-3 w-3" />
              Add more
            </Button>
          </div>
        </TabsContent>
        <TabsContent
          value="testimonials"
          className="bg-sidebar border flex-1 rounded-sm"
        >
          <div className="flex items-center justify-between border-b p-2">
            <span className="flex gap-2 items-center">
              <Users className="h-4 w-4" />
              <p>Testimonials</p>
            </span>
            <Button
              className="flex gap-2 rounded-full text-xs"
              size="xs"
              variant="secondary"
            >
              <Plus className="h-3 w-3" />
              Add more
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      {/* End - all information */}
    </div>
  );
};

export default Page;
