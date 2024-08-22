/*
  Warnings:

  - Changed the type of `interval` on the `RecurringPayment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RecurringPaymentInterval" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'ANNUALLY');

-- AlterTable
ALTER TABLE "RecurringPayment" DROP COLUMN "interval",
ADD COLUMN     "interval" "RecurringPaymentInterval" NOT NULL;
