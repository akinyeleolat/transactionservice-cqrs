import { IQueryResult } from '@nestjs/cqrs';

export class ItemInGetTransactionsResult {
  readonly txnId: string = '';
  readonly customerId: string = '';
  readonly transactionAmount: number = 0;
  readonly transactionCurrency: string = '';
  readonly processedAmount: number = 0;
  readonly processedCurrency: string = '';
  readonly transactionReference: string = '';
  readonly createdAt: Date = new Date();
  readonly updatedAt: Date = new Date();
}

export class GetTransactionsResult implements IQueryResult {
  readonly itemCount: number = 0;
  readonly page: number = 0;
  readonly pageSize: number = 0;
  readonly pageCount: number = 0;
  readonly transactions: ItemInGetTransactionsResult[] = [];
}
