import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTransactionBodyDto {
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  @ApiProperty({ minLength: 2, maxLength: 32, example: 'young-jkk-2322' })
  readonly customerId!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5)
  @ApiProperty({ minLength: 2, maxLength: 5, example: 'NGN' })
  readonly transactionCurrency!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5)
  @ApiProperty({ minLength: 2, maxLength: 5, example: 'NGN' })
  readonly processedCurrency!: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ example: 2000 })
  readonly transactionAmount!: number;
}
