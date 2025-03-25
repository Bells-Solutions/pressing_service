import { Request, Response } from "express";
import { ORDER_STATUS, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get orders of the logged-in user
export const getMyOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const auth0_id = req.body.auth0_id; // Auth0 user ID from the token

    if (!auth0_id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { auth0_id } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
};

export const getMyOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const auth0_id = req.auth?.sub;

  const user = await prisma.user.findUnique({ where: { auth0_id } });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: { deliveryPerson: true },
  });

  if (!order || order.userId !== user.id) {
    res.status(403).json({ message: "Unauthorized to access this order" });
    return;
  }

  res.json(order);
};

// Create a new order
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const auth0_id = req.auth?.sub;
    const { service, totalAmount } = req.body;

    const user = await prisma.user.findUnique({ where: { auth0_id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const newOrder = await prisma.order.create({
      data: {
        service,
        totalAmount,
        userId: user.id,
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.order.delete({ where: { id } });
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};

// Reorder an order
export const reOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const auth0_id = req.auth?.sub;

    const user = await prisma.user.findUnique({ where: { auth0_id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const previousOrder = await prisma.order.findUnique({ where: { id } });

    if (!previousOrder || previousOrder.userId !== user.id) {
      res.status(403).json({ message: "Unauthorized to reorder this order" });
      return;
    }

    const newOrder = await prisma.order.create({
      data: {
        service: previousOrder.service,
        totalAmount: previousOrder.totalAmount,
        userId: user.id,
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to reorder" });
  }
};

export const cancelMyOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const auth0_id = req.auth?.sub;

    const user = await prisma.user.findUnique({ where: { auth0_id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const order = await prisma.order.findUnique({ where: { id } });

    if (!order || order.userId !== user.id) {
      res.status(403).json({ message: "Unauthorized to cancel this order" });
      return;
    }

    // ❗ Only allow cancel if status is PENDING
    if (order.status !== "PENDING") {
      res.status(400).json({
        message: "Cannot cancel. Order already in progress or delivered.",
      });
      return;
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status: ORDER_STATUS.CANCELLED }, // Optional: Add CANCELLED status to your enum
    });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel order" });
  }
};

export const getMyOrdersWithFilters = async (
  req: Request,
  res: Response
): Promise<void> => {
  const auth0_id = req.auth?.sub;
  const { status, startDate, endDate } = req.query;

  const user = await prisma.user.findUnique({ where: { auth0_id } });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
      status:
        status && Object.values(ORDER_STATUS).includes(status as ORDER_STATUS)
          ? (status as ORDER_STATUS)
          : undefined,
      createdAt: {
        gte: startDate ? new Date(startDate.toString()) : undefined,
        lte: endDate ? new Date(endDate.toString()) : undefined,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  res.json(orders);
};
