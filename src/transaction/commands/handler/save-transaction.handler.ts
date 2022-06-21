import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../../entities/transaction';
import { SaveTransactionCommand } from '../impl/save-transaction.command';
import { generateRefence as GenerateTransactionReference } from '../../../helpers/Util';
import { RateClientService } from '../../../integration/rate/rate.service';
import { CreateTransactionResult } from '../../queries/results/create-transaction.result';
import { Currency } from '../../helpers/currency.enum';

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
    const transactionCurrency = transaction.transactionCurrency;
    if (!Object.values(Currency).includes(transactionCurrency as Currency)) {
      throw new UnprocessableEntityException(
        'The transaction currency not currently supported',
      );
    }
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

    const data = transaction;

    if (!data) throw new InternalServerErrorException();

    const dataKeys = Object.keys(data);
    const resultKeys = Object.keys(new CreateTransactionResult());

    if (dataKeys.length < resultKeys.length)
      throw new InternalServerErrorException();

    if (resultKeys.find((resultKey) => !dataKeys.includes(resultKey)))
      throw new InternalServerErrorException();

    return data;
  }
}
