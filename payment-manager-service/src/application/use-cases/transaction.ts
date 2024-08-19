import { Decimal } from "@prisma/client/runtime/library";
import AccountRepository from "../../infrastructure/repositories/account";
import TransactionRepository from "../../infrastructure/repositories/transaction";
import {
  PaymentSendReq,
  PaymentWithdrawReq,
} from "../../presentation/schemas/payment";
import { AppError } from "../../utils/error";
import PaymentHistoryRepository from "../../infrastructure/repositories/payment-history";
import { PrismaClient } from "@prisma/client";

class TransactionUseCase {
  private transactionRepository: TransactionRepository;
  private accountRepository: AccountRepository;
  private paymentHistoryRepository: PaymentHistoryRepository;

  constructor(
    transactionRepository: TransactionRepository,
    accountRepository: AccountRepository,
    paymentHistoryRepository: PaymentHistoryRepository,
  ) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
    this.paymentHistoryRepository = paymentHistoryRepository;
  }

  public async getByUserId(userId: string) {
    return await this.transactionRepository.findByUserId(userId);
  }

  public async sendPaymentFromUser(
    db: PrismaClient,
    req: PaymentSendReq,
    userId: string,
  ) {
    // validate account id
    const checkAccount = await this.accountRepository.findById(req.account_id);
    if (checkAccount === null) {
      throw new AppError(400, "Account id not found");
    }
    // validate account id is belom to current user
    const accountBelongToUser = await this.accountRepository.findByIdAndUserId(
      req.account_id,
      userId,
    );
    if (accountBelongToUser === null) {
      throw new AppError(403, "This account is not belong to current user");
    }
    try {
      const amountDecimal = new Decimal(req.amount);
      // add to transaction with pending status
      const txResult = await db.$transaction(async (tx) => {
        const createTransactionResult = await this.transactionRepository.create(
          tx,
          {
            account_id: req.account_id,
            amount: amountDecimal,
            currency: req.currency,
            transaction_type: "SEND",
          },
        );
        const createPaymentHistoryResult =
          await this.paymentHistoryRepository.create(tx, {
            amount: amountDecimal,
            account_id: req.account_id,
            transaction_type: "SEND",
            status: "PENDING",
            transaction_id: createTransactionResult.id,
          });
        return {
          transaction_id: createTransactionResult.id,
          payment_history_id: createPaymentHistoryResult.id,
        };
      });
      return txResult;
    } catch (e) {
      console.error(e);
      throw new AppError(500, "Failed create transaction");
    }
    // done
  }

  public async withdrawPaymentForUser(
    db: PrismaClient,
    req: PaymentWithdrawReq,
    userId: string,
  ) {
    // validate account id
    const checkAccount = await this.accountRepository.findById(req.account_id);
    if (checkAccount === null) {
      throw new AppError(400, "Account id not found");
    }
    // validate account id is belong to current user
    const accountBelongToUser = await this.accountRepository.findByIdAndUserId(
      req.account_id,
      userId,
    );
    if (accountBelongToUser === null) {
      throw new AppError(403, "This account is not belong to current user");
    }
    try {
      const amountDecimal = new Decimal(req.amount);
      const txResult = db.$transaction(async (tx) => {
        // add to transaction with pending status
        const createTransactionResult = await this.transactionRepository.create(
          tx,
          {
            account_id: req.account_id,
            amount: amountDecimal,
            currency: req.currency,
            transaction_type: "WITHDRAW",
          },
        );

        // add to payment history with pending status
        const createPaymentHistoryResult =
          await this.paymentHistoryRepository.create(tx, {
            amount: amountDecimal,
            account_id: req.account_id,
            transaction_type: "WITHDRAW",
            status: "PENDING",
            transaction_id: createTransactionResult.id,
          });
        return {
          transaction_id: createTransactionResult.id,
          payment_history_id: createPaymentHistoryResult.id,
        };
      });
      return txResult;
    } catch (e) {
      console.error(e);
      throw new AppError(500, "Failed create transaction");
    }
    // done
  }
}

export default TransactionUseCase;
