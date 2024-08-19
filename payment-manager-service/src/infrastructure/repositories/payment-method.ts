import { PaymentMethodType, PrismaClient } from "@prisma/client";

class PaymentMethodRepository {
  private db: PrismaClient;
  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async findById(id: number) {
    return this.db.paymentMethod.findFirst({ where: { id: id } });
  }

  public async findByType(type: PaymentMethodType) {
    return this.db.paymentMethod.findFirst({
      where: { payment_method_type: type },
    });
  }
}

export default PaymentMethodRepository;
