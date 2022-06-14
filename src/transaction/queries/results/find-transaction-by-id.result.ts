import { IQueryResult } from '@nestjs/cqrs';

export class FindTransactionByIdResult implements IQueryResult {
  readonly txnId: string = '';
  readonly customerId: string = '';
  readonly transactionAmount: number = 0;
  readonly transactionCurrency: string = '';
  readonly processedAmount: number = 0;
  readonly processedCurrency: string = '';
  readonly createdAt: Date = new Date();
  readonly updatedAt: Date = new Date();
}
