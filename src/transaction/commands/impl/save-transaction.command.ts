export class SaveTransactionCommand {
  customerId!: string;
  transactionAmount!: number;
  transactionCurrency!: string;
  processedCurrency!: string;
}
