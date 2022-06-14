import { MigrationInterface, QueryRunner } from 'typeorm';

export class transactionInit1655097973334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      // eslint-disable-next-line quotes
      'CREATE TABLE transaction (txnId varchar(36) NOT NULL, customerId char(36) NOT NULL, transactionReference char(36) NOT NULL, transactionAmount decimal(15,2) NOT NULL DEFAULT 0,transactionCurrency char(5) NOT NULL, processedAmount decimal(15,2) NOT NULL DEFAULT 0,processedCurrency char(5) NOT NULL, createdAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (txnId))',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE transaction', undefined);
  }
}
