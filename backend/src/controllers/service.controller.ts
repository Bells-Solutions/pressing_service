import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getServices = async (req: Request, res: Response) => {
  const services = await prisma.service.findMany();
  res.json(services);
};

export const createService = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const service = await prisma.service.create({
    data: { name, description, price },
  });
  res.status(201).json(service);
};

export const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const service = await prisma.service.update({
    where: { id },
    data: { name, description, price },
  });
  res.json(service);
};

export const deleteService = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.service.delete({ where: { id } });
  res.json({ message: "Service deleted" });
};
