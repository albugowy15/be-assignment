import TransactionRepository from "../../infrastructure/repositories/transaction";

class TransactionUseCase {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public async getByUserId(userId: string) {
    return await this.transactionRepository.findByUserId(userId);
  }
}

export default TransactionUseCase;
