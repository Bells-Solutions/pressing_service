import { Request, Response, NextFunction } from "express";

// Extend the Request interface to include the 'auth' property
declare global {
  namespace Express {
    interface Request {
      auth?: { sub: string };
    }
  }
}
import { PrismaClient, USER_ROLE } from "@prisma/client";

const prisma = new PrismaClient();

export const requireRole = (role: USER_ROLE) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const auth0_id = req.auth?.sub;

    if (!auth0_id) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({ where: { auth0_id } });

    if (!user || user.role !== role) {
      res.status(403).json({ message: "Access denied." });
      return;
    }

    next();
  };
};
