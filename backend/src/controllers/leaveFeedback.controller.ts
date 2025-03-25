import { Request, Response } from "express";
import { PrismaClient, ORDER_STATUS, USER_ROLE } from "@prisma/client";

const prisma = new PrismaClient();

export const leaveFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const auth0_id = req.auth?.sub;

  const user = await prisma.user.findUnique({ where: { auth0_id } });
  const order = await prisma.order.findUnique({ where: { id } });

  if (!user || !order || order.userId !== user.id) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  if (order.status !== "DELIVERED") {
    res
      .status(400)
      .json({ message: "You can only leave feedback after delivery." });
    return;
  }

  const feedback = await prisma.feedback.create({
    data: { rating, comment, orderId: id },
  });

  res.status(201).json(feedback);
};
