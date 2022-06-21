import { ApiProperty } from '@nestjs/swagger';

import {
  GetTransactionsResult,
  ItemInGetTransactionsResult,
} from '../queries/results/get-all-transaction.result';

class GetTransactionsItem extends ItemInGetTransactionsResult {
  @ApiProperty({ format: 'uuid' })
  readonly txnId!: string;

  @ApiProperty({ example: 'hakskss-hsksks' })
  readonly customerId!: string;

  @ApiProperty({ example: 100 })
  readonly transactionAmount!: number;

  @ApiProperty({ example: 'NGN' })
  readonly transactionCurrency!: string;

  @ApiProperty({ example: 100 })
  readonly processedAmount!: number;

  @ApiProperty({ example: 'NGN' })
  readonly processedCurrency!: string;

  @ApiProperty()
  readonly createdAt!: Date;

  @ApiProperty()
  readonly updatedAt!: Date;
}

export class GetTransactionsResponseDTO {
  @ApiProperty({ example: 10 })
  readonly itemCount!: number;

  @ApiProperty({ example: 1 })
  readonly page!: number;

  @ApiProperty({ example: 10 })
  readonly pageSize!: number;

  @ApiProperty({ example: 4 })
  readonly pageCount!: number;

  @ApiProperty({ type: [GetTransactionsItem] })
  readonly transactions: GetTransactionsResult = new GetTransactionsResult();
}
