/*
  Warnings:

  - You are about to drop the column `frequency` on the `RecurringPayment` table. All the data in the column will be lost.
  - You are about to drop the column `next_payment_date` on the `RecurringPayment` table. All the data in the column will be lost.
  - Added the required column `interval` to the `RecurringPayment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecurringPaymentInterval" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'ANNUALLY');

-- AlterTable
ALTER TABLE "RecurringPayment" DROP COLUMN "frequency",
DROP COLUMN "next_payment_date",
ADD COLUMN     "interval" "RecurringPaymentInterval" NOT NULL;
