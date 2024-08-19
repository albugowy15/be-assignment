import { PrismaClient, RecurringPayment } from "@prisma/client";

class RecurringPaymentRepository {
  private db: PrismaClient;
  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async create(
    value: Pick<
      RecurringPayment,
      "amount" | "currency" | "interval" | "account_id"
    >,
  ) {
    return await this.db.recurringPayment.create({
      select: {
        id: true,
      },
      data: {
        amount: value.amount,
        currency: value.currency,
        interval: value.interval,
        account_id: value.account_id,
      },
    });
  }
}

export default RecurringPaymentRepository;
