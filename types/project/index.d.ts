import { Project, User } from "@prisma/client";

export interface ProjectWithUserDetailsAndProposals extends Project {
  user: User;
  proposals?: Proposal[];
}

export interface ProjectWithUserDetails extends Project {
  user: User;
}
