import { NextApiRequest } from "next";

import db from "@/libs/db";
import { ProjectValidator } from "@/libs/validators/project";
import { NextApiResponseServerIo } from "@/types/socket";
import { authOptions, getAuthSession } from "@/libs/auth";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;
    body.deadline = new Date(body.deadline);

    const {
      title,
      description,
      deadline,
      experienceLevel,
      pricingScheme,
      price,
    } = ProjectValidator.parse(body);

    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const project = await db.project.create({
      data: {
        userId: session.user.id,
        title: title,
        description: description,
        pricingScheme: pricingScheme || "FIXED",
        price: parseInt(price as unknown as string),
        deadline: deadline || new Date(),
        duration: body.duration,
        experienceLevel,
      },
    });

    if (project) {
      res?.socket?.server?.io?.emit("project:new", project);

      return res.status(201).json(project);
    }

    return res.status(400).json({ message: "Project creation failed" });
  } catch (error) {
    console.log("[PROJECTS_POST]", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
