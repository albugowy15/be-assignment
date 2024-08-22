import { PaymentAccount, PrismaClient } from "@repo/database";

class AccountRepository {
  private db: PrismaClient;
  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async create(
    value: Pick<
      PaymentAccount,
      "payment_account_number" | "currency" | "user_id" | "payment_method_id"
    >,
  ) {
    await this.db.paymentAccount.create({
      data: {
        ...value,
      },
    });
  }

  public async findByUserId(userId: string) {
    return await this.db.paymentAccount.findMany({
      where: { user_id: userId },
    });
  }

  public async findByAccountNumber(accountNumber: string) {
    return await this.db.paymentAccount.findFirst({
      where: { payment_account_number: accountNumber },
    });
  }

  public async findById(id: number) {
    return await this.db.paymentAccount.findFirst({ where: { id: id } });
  }

  public async findByIdAndUserId(id: number, userId: string) {
    return await this.db.paymentAccount.findFirst({
      where: {
        id: id,
        user_id: userId,
      },
    });
  }
}

export default AccountRepository;
