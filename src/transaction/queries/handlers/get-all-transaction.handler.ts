/* eslint-disable @typescript-eslint/no-unused-vars */
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from '../../../entities/transaction';
import { GetAllTransactionQuery } from '../impl/get-all-transaction.query';
import { ItemInTransaction } from '../../repository/transaction.query';
import {
  GetTransactionsResult,
  ItemInGetTransactionsResult,
} from '../results/get-all-transaction.result';

@QueryHandler(GetAllTransactionQuery)
export class GetAllTransactionHandler
  implements IQueryHandler<GetAllTransactionQuery, GetTransactionsResult>
{
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}
  async execute(query: GetAllTransactionQuery): Promise<GetTransactionsResult> {
    const [list, count] = await this.transactionRepo.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });

    const data = list.map(this.filterResultProperties);
    return {
      itemCount: count,
      page: query.page,
      pageSize: query.pageSize,
      pageCount: Math.ceil(count / query.pageSize),
      transactions: data,
    };
  }

  private filterResultProperties(
    data: ItemInTransaction,
  ): ItemInGetTransactionsResult {
    const dataKeys = Object.keys(data);
    const resultKeys = Object.keys(new ItemInGetTransactionsResult());

    if (dataKeys.length < resultKeys.length)
      throw new InternalServerErrorException();

    if (resultKeys.find((resultKey) => !dataKeys.includes(resultKey)))
      throw new InternalServerErrorException();

    return data;
  }
}
