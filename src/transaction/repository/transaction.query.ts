export class Transaction {
  readonly txnId!: string;
  readonly customerId!: string;
  readonly transactionAmount!: number;
  readonly transactionCurrency!: string;
  readonly processedAmount!: number;
  readonly processedCurrency!: string;
  readonly transactionReference!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export class ItemInTransaction {
  readonly txnId!: string;
  readonly customerId!: string;
  readonly transactionAmount!: number;
  readonly transactionCurrency!: string;
  readonly processedAmount!: number;
  readonly processedCurrency!: string;
  readonly transactionReference!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export class Transactions extends Array<ItemInTransaction> {}

// export interface TransactionQuery {
//   findById: (id: string) => Promise<Transaction | undefined>;
//   find: (page: number, pageSize: number) => Promise<Transactions>;
// }
