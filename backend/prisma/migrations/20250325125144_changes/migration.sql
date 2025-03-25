/*
  Warnings:

  - You are about to drop the column `DELIVERYPersonId` on the `Order` table. All the data in the column will be lost.
  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `totalAmount` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('PENDING', 'RECEIVED', 'IN_PROGRESS', 'READY_FOR_DELIVERY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_DELIVERYPersonId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "DELIVERYPersonId",
ADD COLUMN     "deliveryPersonId" TEXT,
ALTER COLUMN "totalAmount" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ORDER_STATUS" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "OrderStatus";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryPersonId_fkey" FOREIGN KEY ("deliveryPersonId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
