import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";
import TransactionUseCase from "../application/use-cases/transaction";
import TransactionRepository from "../infrastructure/repositories/transaction";
import AccountRepository from "../infrastructure/repositories/account";
import PaymentHistoryRepository from "../infrastructure/repositories/payment-history";
import RecurringPaymentRepository from "../infrastructure/repositories/recurring-payment";

declare module "fastify" {
  interface FastifyInstance {
    transactionUseCase: TransactionUseCase;
    db: PrismaClient;
  }
}

const bootstrapAppPlugin: FastifyPluginAsync = fp(async (server, _opts) => {
  const db = new PrismaClient();
  await db.$connect();
  const accountRepository = new AccountRepository(db);
  const transactionRepository = new TransactionRepository(db);
  const paymentHistoryRepository = new PaymentHistoryRepository(db);
  const recurringPaymentRepository = new RecurringPaymentRepository(db);

  const transactionUseCase = new TransactionUseCase(
    transactionRepository,
    accountRepository,
    paymentHistoryRepository,
    recurringPaymentRepository,
  );

  server.decorate("transactionUseCase", transactionUseCase);
  server.decorate("db", db);
  server.addHook("onClose", async (server) => {
    server.db.$disconnect();
  });
});

export default bootstrapAppPlugin;
