/*
  Warnings:

  - The values [DEPOSIT,WITHDRAWAL,TRANSFER,PAYMENT,REFUND,FEE] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `account_number` on the `PaymentAccount` table. All the data in the column will be lost.
  - You are about to drop the column `account_type` on the `PaymentAccount` table. All the data in the column will be lost.
  - You are about to drop the column `balance` on the `PaymentAccount` table. All the data in the column will be lost.
  - You are about to drop the column `from_account_id` on the `RecurringPayment` table. All the data in the column will be lost.
  - You are about to drop the column `to_account_id` on the `RecurringPayment` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `RecurringPayment` table. All the data in the column will be lost.
  - You are about to drop the column `from_account_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `to_account_id` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_account_number]` on the table `PaymentAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_account_number` to the `PaymentAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method_id` to the `PaymentAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `RecurringPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('CARD', 'WALLET');

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('SEND', 'WITHDRAW');
ALTER TABLE "PaymentHistory" ALTER COLUMN "transaction_type" TYPE "TransactionType_new" USING ("transaction_type"::text::"TransactionType_new");
ALTER TABLE "Transaction" ALTER COLUMN "transaction_type" TYPE "TransactionType_new" USING ("transaction_type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- DropIndex
DROP INDEX "PaymentAccount_account_number_key";

-- AlterTable
ALTER TABLE "PaymentAccount" DROP COLUMN "account_number",
DROP COLUMN "account_type",
DROP COLUMN "balance",
ADD COLUMN     "payment_account_number" TEXT NOT NULL,
ADD COLUMN     "payment_method_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RecurringPayment" DROP COLUMN "from_account_id",
DROP COLUMN "to_account_id",
DROP COLUMN "user_id",
ADD COLUMN     "account_id" BIGINT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "from_account_id",
DROP COLUMN "timestamp",
DROP COLUMN "to_account_id",
ADD COLUMN     "account_id" BIGINT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropEnum
DROP TYPE "AccountType";

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "payment_method_type" "PaymentMethodType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentAccount_payment_account_number_key" ON "PaymentAccount"("payment_account_number");

-- AddForeignKey
ALTER TABLE "PaymentAccount" ADD CONSTRAINT "PaymentAccount_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringPayment" ADD CONSTRAINT "RecurringPayment_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
