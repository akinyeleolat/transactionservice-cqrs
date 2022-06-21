import { ICommand } from '@nestjs/cqrs';

export class UpdateTransactionCommand implements ICommand {
  constructor(
    readonly txnId: string,
    readonly transactionCurrency: string,
    readonly processedCurrency: string,
    readonly transactionAmount: number,
  ) {}
}
