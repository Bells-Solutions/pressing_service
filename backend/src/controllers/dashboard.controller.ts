import { Request, Response } from "express";
import { PrismaClient, ORDER_STATUS, USER_ROLE } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      totalOrders,
      revenueData,
      totalCustomers,
      totalDeliveries,
      statusBreakdown,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { totalAmount: true } }),
      prisma.user.count({ where: { role: USER_ROLE.CUSTOMER } }),
      prisma.order.count({ where: { deliveryPersonId: { not: null } } }),
      prisma.order.groupBy({
        by: ["status"],
        _count: { status: true },
      }),
    ]);

    res.json({
      totalOrders,
      totalRevenue: revenueData._sum.totalAmount || 0,
      totalCustomers,
      totalDeliveries,
      ordersByStatus: statusBreakdown.map((entry) => ({
        status: entry.status,
        count: entry._count.status,
      })),
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
