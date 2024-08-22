import { PrismaClient, PaymentAccount } from "@repo/database";

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
    return await this.db.paymentAccount.create({
      select: { id: true },
      data: {
        ...value,
      },
    });
  }

  public async update(
    value: Pick<
      PaymentAccount,
      "payment_account_number" | "currency" | "payment_method_id"
    >,
    id: number,
  ) {
    return await this.db.paymentAccount.update({
      select: { id: true },
      where: {
        id: id,
      },
      data: {
        payment_account_number: value.payment_account_number,
        currency: value.currency,
        payment_method_id: value.payment_method_id,
        updated_at: Date.now().toString(),
      },
    });
  }

  public async findById(id: number) {
    return await this.db.paymentAccount.findFirst({
      where: { id: id },
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

  public async findByIdAndUserId(id: number, userId: string) {
    return await this.db.paymentAccount.findFirst({
      where: { id: id, user_id: userId },
    });
  }

  public async findByAccountNumberExcludeId(id: number, accountNumber: string) {
    return await this.db.paymentAccount.findFirst({
      where: {
        payment_account_number: accountNumber,
        id: {
          not: id,
        },
      },
    });
  }

  public async delete(id: number) {
    return await this.db.paymentAccount.delete({
      select: { id: true },
      where: { id: id },
    });
  }
}

export default AccountRepository;
