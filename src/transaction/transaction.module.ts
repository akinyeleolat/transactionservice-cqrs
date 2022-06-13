import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { TransactionController } from './transaction.controller';
import { Transaction } from 'src/entities/transaction';
import { GetAllTransactionHandler } from './queries/handlers/get-all-transaction.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), CqrsModule],
  controllers: [TransactionController],
  providers: [GetAllTransactionHandler],
})
export class TransactionModule {}