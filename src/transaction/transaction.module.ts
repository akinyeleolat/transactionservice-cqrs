import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { TransactionController } from './transaction.controller';
import { Transaction } from '../entities/transaction';
import { GetAllTransactionHandler } from './queries/handlers/get-all-transaction.handler';
import { SaveTransactionHandler } from './commands/handler/save-transaction.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), CqrsModule],
  controllers: [TransactionController],
  providers: [GetAllTransactionHandler, SaveTransactionHandler],
})
export class TransactionModule {}
