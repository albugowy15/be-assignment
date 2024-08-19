-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('CARD', 'WALLET');

-- CreateEnum
CREATE TYPE "PaymentHistoryStatus" AS ENUM ('COMPLETED', 'FAILED', 'PENDING', 'REVERSED');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REJECTED', 'REVERSED');

-- CreateEnum
CREATE TYPE "RecurringPaymentStatus" AS ENUM ('ACTIVE', 'PAUSED', 'CANCELLED', 'COMPLETED', 'FAILED', 'PENDING_APPROVAL');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('SEND', 'WITHDRAW');

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "payment_method_type" "PaymentMethodType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentAccount" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "payment_account_number" TEXT NOT NULL,
    "payment_method_id" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentHistory" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,
    "status" "PaymentHistoryStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecurringPayment" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "next_payment_date" TIMESTAMP(3) NOT NULL,
    "status" "RecurringPaymentStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecurringPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentAccount_payment_account_number_key" ON "PaymentAccount"("payment_account_number");

-- AddForeignKey
ALTER TABLE "PaymentAccount" ADD CONSTRAINT "PaymentAccount_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringPayment" ADD CONSTRAINT "RecurringPayment_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
