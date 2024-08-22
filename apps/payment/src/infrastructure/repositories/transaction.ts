import { PrismaClient, Transaction, Prisma } from "@repo/database";

class TransactionRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async create(
    tx: Prisma.TransactionClient,
    value: Pick<
      Transaction,
      "account_id" | "amount" | "currency" | "transaction_type"
    >,
  ) {
    return await tx.transaction.create({
      select: {
        id: true,
      },
      data: {
        account_id: value.account_id,
        amount: value.amount,
        currency: value.currency,
        transaction_type: value.transaction_type,
      },
    });
  }

  public async findByAccountId(accountId: number) {
    return await this.db.transaction.findMany({
      where: { account_id: accountId },
    });
  }

  public async findByUserId(userId: string) {
    return await this.db.transaction.findMany({
      select: {
        id: true,
        amount: true,
        transaction_type: true,
        status: true,
        currency: true,
        account_id: true,
        created_at: true,
        updated_at: true,
      },
      where: {
        Account: {
          user_id: userId,
        },
      },
    });
  }
}

export default TransactionRepository;
