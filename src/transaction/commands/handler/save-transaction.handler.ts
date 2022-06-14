import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../../entities/transaction';
import { SaveTransactionCommand } from '../impl/save-transaction.command';
import {
  CurrencyConverter,
  generateRefence as GenerateTransactionReference,
} from '../../../helpers/Util';

@CommandHandler(SaveTransactionCommand)
export class SaveTransactionHandler
  implements ICommandHandler<SaveTransactionCommand>
{
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

  async execute(command: SaveTransactionCommand) {
    const transaction = new Transaction();
    transaction.customerId = command.customerId;
    transaction.transactionAmount = command.transactionAmount;
    transaction.transactionCurrency = command.transactionCurrency;
    transaction.processedCurrency = command.processedCurrency;
    if (transaction.transactionCurrency === transaction.processedCurrency) {
      transaction.processedAmount = transaction.transactionAmount;
    }
    // use rate service
    transaction.processedAmount = await CurrencyConverter(
      transaction.transactionCurrency,
      transaction.processedCurrency,
      transaction.transactionAmount,
    );
    transaction.transactionReference = GenerateTransactionReference();
    transaction.processedCurrency = transaction.processedCurrency.toUpperCase();
    transaction.transactionCurrency =
      transaction.processedCurrency.toUpperCase();
    await this.transactionRepo.insert(transaction);
  }
}
