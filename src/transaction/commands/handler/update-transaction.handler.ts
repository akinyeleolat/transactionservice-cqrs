import { CommandHandler, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  InternalServerErrorException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../../entities/transaction';
import { UpdateTransactionCommand } from '../impl/update-transaction.command';
import { RateClientService } from '../../../integration/rate/rate.service';
import { FindTransactionByIdQuery } from '../../queries/impl/find-transaction-by-id.query';
import { FindTransactionByIdResult } from '../../queries/results/find-transaction-by-id.result';

@CommandHandler(UpdateTransactionCommand)
export class UpdateTransactionHandler
  implements ICommandHandler<UpdateTransactionCommand>
{
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    private rateClientService: RateClientService,
  ) {}

  async execute(
    command: UpdateTransactionCommand,
    query: FindTransactionByIdQuery,
  ):Promise<FindTransactionByIdResult> {
    const transaction = new Transaction();
    const data = await this.transactionRepo.findOne({
      where: {
        txnId: query.id,
      },
    });
    if (!data) throw new NotFoundException('Transaction with ID not found');

    transaction.customerId = data.customerId;
    transaction.transactionAmount = command.transactionAmount;
    transaction.transactionCurrency = data.transactionCurrency || command.transactionCurrency;
  }
}
