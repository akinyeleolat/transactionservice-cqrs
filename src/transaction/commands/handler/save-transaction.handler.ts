import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../../entities/transaction';
import { SaveTransactionCommand } from '../impl/save-transaction.command';
import { generateRefence as GenerateTransactionReference } from '../../../helpers/Util';
import { RateClientService } from '../../../integration/rate/rate.service';

@CommandHandler(SaveTransactionCommand)
export class SaveTransactionHandler
  implements ICommandHandler<SaveTransactionCommand>
{
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    private rateClientService: RateClientService,
  ) {}

  async execute(command: SaveTransactionCommand) {
    const transaction = new Transaction();
    transaction.customerId = command.customerId;
    transaction.transactionAmount = command.transactionAmount;
    transaction.transactionCurrency = command.transactionCurrency;
    transaction.processedCurrency = command.processedCurrency;
    // use rate service
    if (transaction.transactionCurrency !== transaction.processedCurrency) {
      const convertData = await this.rateClientService.convert({
        from: transaction.transactionCurrency,
        to: transaction.processedCurrency,
        amount: transaction.transactionAmount,
      });

      transaction.processedAmount = convertData?.amount;
    } else {
      transaction.processedAmount = transaction.transactionAmount;
    }
    transaction.transactionReference = GenerateTransactionReference();
    transaction.processedCurrency = transaction.processedCurrency.toUpperCase();
    transaction.transactionCurrency =
      transaction.transactionCurrency.toUpperCase();
    await this.transactionRepo.insert(transaction);
  }
}
