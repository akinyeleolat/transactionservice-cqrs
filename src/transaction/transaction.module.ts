import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { TransactionController } from './transaction.controller';
import { Transaction } from '../entities/transaction';
import { GetAllTransactionHandler } from './queries/handlers/get-all-transaction.handler';
import { SaveTransactionHandler } from './commands/handler/save-transaction.handler';
import { FindTransactionByIdHandler } from './queries/handlers/find-transaction-by-id.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), CqrsModule],
  controllers: [TransactionController],
  providers: [
    GetAllTransactionHandler,
    SaveTransactionHandler,
    FindTransactionByIdHandler,
  ],
})
export class TransactionModule {}
