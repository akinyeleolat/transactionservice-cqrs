import {
  Controller,
  Get,
  Body,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { SaveTransactionCommand } from './commands/impl/save-transaction.command';
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

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createTransaction(@Body() newTransaction: SaveTransactionCommand) {
    return await this.commandBus.execute(newTransaction);
  }
}
