import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../../entities/transaction';
import { SaveTransactionCommand } from '../impl/save-transaction.command';
import { generateRefence as GenerateTransactionReference } from '../../../helpers/Util';

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
      // use rate service
      transaction.processedAmount = transaction.transactionAmount;
    }
    transaction.transactionReference = GenerateTransactionReference();
    await this.transactionRepo.insert(transaction);
  }
}
