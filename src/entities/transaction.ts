import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  txnId!: string;

  @Column('char', {
    length: 36,
    comment: 'ID of customer for this transaction',
  })
  customerId!: string;

  @Column({ name: 'transactionReference' })
  transactionReference!: string;

  @Column('decimal', {
    unsigned: true,
    precision: 19,
    scale: 10,
    default: 0,
  })
  transactionAmount!: number;

  @Column('char', {
    length: 3,
  })
  transactionCurrency!: string;

  @Column('decimal', {
    unsigned: true,
    precision: 19,
    scale: 10,
    default: 0,
  })
  processedAmount!: number;

  @Column('char', {
    length: 3,
  })
  processedCurrency!: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;

  @BeforeInsert()
  genarate() {
    this.txnId = uuid();
  }
}
