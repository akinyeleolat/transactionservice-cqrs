import { ApiProperty } from '@nestjs/swagger';
import { CreateTransactionResult } from '../queries/results/create-transaction.result';

export class CreateTransactionResponseDTO extends CreateTransactionResult {
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
