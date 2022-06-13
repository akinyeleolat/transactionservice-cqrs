import { Controller, Get } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetAllTransactionQuery } from './queries/impl/get-all-transaction.query';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getAll() {
    return await this.queryBus.execute(new GetAllTransactionQuery());
  }
}
