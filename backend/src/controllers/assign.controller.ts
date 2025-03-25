import { PrismaClient, USER_ROLE } from "@prisma/client";
import { Request, Response } from "express";
import { sendNotificationEmail } from "../services/email.service";
import { sendSMS } from "../services/sms.service";

const prisma = new PrismaClient();

export const assignDeliveryPerson = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Order ID
    const { deliveryPersonId } = req.body; // DELIVERY user ID from ADMIN

    // Validate DELIVERY person exists and has the role
    const deliveryUser = await prisma.user.findUnique({
      where: { id: deliveryPersonId },
    });

    if (!deliveryUser || deliveryUser.role !== USER_ROLE.DELIVERY) {
      res.status(400).json({ message: "Invalid Delivery person." });
      return;
    }

    // ✅ Send SMS Notification
    if (deliveryUser.phone) {
      await sendSMS(
        deliveryUser.phone,
        `📦 Hello ${deliveryUser.name}, you have been assigned to Order #${id}.`
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { deliveryPersonId: deliveryUser.id },
    });

    // ✅ Send Email Notification
    await sendNotificationEmail(
      deliveryUser.email,
      "📦 New DELIVERY Assignment",
      `Hello ${deliveryUser.name},\n\nYou have been assigned to Order ${id}.\n\nThanks.`
    );

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to assign DELIVERY person" });
  }
};

export const getAssignedOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const auth0_id = req.auth?.sub;

    if (!auth0_id) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const deliveryUser = await prisma.user.findUnique({ where: { auth0_id } });

    if (!deliveryUser || deliveryUser.role !== USER_ROLE.DELIVERY) {
      res.status(403).json({ message: "Access denied. Delivery only" });
      return;
    }

    const orders = await prisma.order.findMany({
      where: { deliveryPersonId: deliveryUser.id },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assigned orders" });
  }
};
