import { PrismaClient, USER_ROLE } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const syncAuth0User = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { sub, name, email } = req.body;

  if (!sub || !email) {
    res.status(400).json({ message: "Invalid Auth0 payload" });
    return;
  }

  let user = await prisma.user.findUnique({ where: { auth0_id: sub } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        auth0_id: sub,
        name: name || "",
        email,
        role: USER_ROLE.CUSTOMER,
        phone: "",
      },
    });
  }
  res.status(200).json(user);
};
