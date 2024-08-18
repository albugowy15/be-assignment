/*
  Warnings:

  - Changed the type of `user_id` on the `PaymentAccount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `RecurringPayment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PaymentAccount" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "RecurringPayment" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;
