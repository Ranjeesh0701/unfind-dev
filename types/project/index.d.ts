import { Project, User } from "@prisma/client";

export interface ProjectWithUserDetails extends Project {
  user: User;
}
