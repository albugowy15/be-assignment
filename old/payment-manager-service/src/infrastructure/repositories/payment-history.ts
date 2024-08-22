import { PaymentHistory, PrismaClient, Prisma } from "@prisma/client";

class PaymentHistoryRepository {
  // @ts-ignore
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async create(
    tx: Prisma.TransactionClient,
    value: Pick<
      PaymentHistory,
      "transaction_type" | "amount" | "account_id" | "transaction_id" | "status"
    >,
  ) {
    return await tx.paymentHistory.create({
      select: {
        id: true,
      },
      data: {
        transaction_type: value.transaction_type,
        amount: value.amount,
        account_id: value.account_id,
        transaction_id: value.transaction_id,
        status: value.status,
      },
    });
  }
}

export default PaymentHistoryRepository;
