import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../../../entities/transaction';
import { FindTransactionByIdQuery } from '../impl/find-transaction-by-id.query';
import { FindTransactionByIdResult } from '../results/find-transaction-by-id.result';

@QueryHandler(FindTransactionByIdQuery)
export class FindTransactionByIdHandler
  implements IQueryHandler<FindTransactionByIdQuery, FindTransactionByIdResult>
{
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}
  async execute(
    query: FindTransactionByIdQuery,
  ): Promise<FindTransactionByIdResult> {
    const data = await this.transactionRepo.findOne({
      where: {
        txnId: query.id,
      },
    });
    if (!data) throw new NotFoundException('Transaction with ID not found');

    const dataKeys = Object.keys(data);
    const resultKeys = Object.keys(new FindTransactionByIdResult());

    if (dataKeys.length < resultKeys.length)
      throw new InternalServerErrorException();

    if (resultKeys.find((resultKey) => !dataKeys.includes(resultKey)))
      throw new InternalServerErrorException();

    return data;
  }
}
