import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import AccountUseCase from "../application/use-cases/account";
import TransactionUseCase from "../application/use-cases/transaction";
import TransactionRepository from "../infrastructure/repositories/transaction";
import PaymentMethodRepository from "../infrastructure/repositories/payment-method";
import AuthUseCase from "../application/use-cases/auth";
import AccountRepository from "../infrastructure/repositories/account";

declare module "fastify" {
  interface FastifyInstance {
    authUseCase: AuthUseCase;
    accountUseCase: AccountUseCase;
    transactionUseCase: TransactionUseCase;
  }
}

const bootstrapAppPlugin: FastifyPluginAsync = fp(async (server, _opts) => {
  const db = new PrismaClient();
  await db.$connect();
  const accountRepository = new AccountRepository(db);
  const transactionRepository = new TransactionRepository(db);
  const paymentMethodRepository = new PaymentMethodRepository(db);

  const supabaseUrl = server.config.SUPABASE_URL;
  const supabaseKey = server.config.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const authUseCase = new AuthUseCase(supabase.auth);
  const accountUseCase = new AccountUseCase(
    accountRepository,
    transactionRepository,
    paymentMethodRepository,
  );
  const transactionUseCase = new TransactionUseCase(transactionRepository);

  server.decorate("accountUseCase", accountUseCase);
  server.decorate("authUseCase", authUseCase);
  server.decorate("transactionUseCase", transactionUseCase);
});

export default bootstrapAppPlugin;
