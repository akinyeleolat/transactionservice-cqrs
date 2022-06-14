import { ICommand } from '@nestjs/cqrs';
export class SaveTransactionCommand implements ICommand {
  constructor(
    readonly customerId: string,
    readonly transactionCurrency: string,
    readonly processedCurrency: string,
    readonly transactionAmount: number,
  ) {}
}
