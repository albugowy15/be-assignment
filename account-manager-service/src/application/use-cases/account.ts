import AccountRepository from "../../infrastructure/repositories/account";
import PaymentMethodRepository from "../../infrastructure/repositories/payment-method";
import TransactionRepository from "../../infrastructure/repositories/transaction";
import {
  AccountCreateReq,
  AccountUpdateReq,
} from "../../presentation/schemas/account";
import { AppError } from "../../utils/error";

class AccountUseCase {
  private accountRepository: AccountRepository;
  private transactionRepository: TransactionRepository;
  private paymentMethodRepository: PaymentMethodRepository;

  constructor(
    accountRepository: AccountRepository,
    transactionRepository: TransactionRepository,
    paymentMethodRepository: PaymentMethodRepository,
  ) {
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
    this.paymentMethodRepository = paymentMethodRepository;
  }

  public async create(req: AccountCreateReq, userId: string) {
    // validate account number
    const sameAccount = await this.accountRepository.findByAccountNumber(
      req.account_number,
    );
    if (sameAccount) {
      throw new AppError(400, "Account number already registered");
    }
    const paymentMethod = await this.paymentMethodRepository.findById(
      req.payment_method_id,
    );
    if (!paymentMethod) {
      throw new AppError(400, "Payment method not found");
    }
    return await this.accountRepository.create({
      user_id: userId,
      currency: req.currency,
      payment_account_number: req.account_number,
      payment_method_id: req.payment_method_id,
    });
  }

  public async getByUserId(userId: string) {
    const rows = await this.accountRepository.findByUserId(userId);
    return rows;
  }

  public async getTransactionsByAccountId(accountId: number) {
    const rows = await this.transactionRepository.findByAccountId(accountId);
    return rows;
  }

  public async update(id: number, req: AccountUpdateReq, userId: string) {
    // validate account_id still same
    const prevAccount = await this.accountRepository.findByIdAndUserId(
      id,
      userId,
    );
    if (!prevAccount) {
      throw new AppError(400, "Account not found for this user");
    }

    const checkUniqueAccountNumber =
      await this.accountRepository.findByAccountNumberExcludeId(
        id,
        req.account_number,
      );
    if (checkUniqueAccountNumber) {
      throw new AppError(400, "This account number already registered");
    }

    const paymentMethod = await this.paymentMethodRepository.findById(
      req.payment_method_id,
    );
    if (!paymentMethod) {
      throw new AppError(400, "Payment method not found");
    }

    return await this.accountRepository.update(
      {
        currency: req.currency,
        payment_account_number: req.account_number,
        payment_method_id: req.payment_method_id,
      },
      id,
    );
  }

  public async delete(id: number, userId: string) {
    const prevAccount = await this.accountRepository.findByIdAndUserId(
      id,
      userId,
    );
    if (!prevAccount) {
      throw new AppError(400, "Account not found for this user");
    }
    return await this.accountRepository.delete(id);
  }
}

export default AccountUseCase;
