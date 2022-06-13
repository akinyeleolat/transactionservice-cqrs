import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../../../entities/transaction';
import { GetAllTransactionQuery } from '../impl/get-all-transaction.query';

@QueryHandler(GetAllTransactionQuery)
export class GetAllTransactionHandler
  implements IQueryHandler<GetAllTransactionQuery>
{
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}
  async execute(query: GetAllTransactionQuery): Promise<Transaction[]> {
    return await this.transactionRepo.find();
  }
}
