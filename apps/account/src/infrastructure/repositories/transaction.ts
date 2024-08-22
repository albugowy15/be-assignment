import { PrismaClient } from "@repo/database";

class TransactionRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
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
