import { IQuery } from '@nestjs/cqrs';
export class GetAllTransactionQuery implements IQuery {
  constructor(readonly page: number, readonly pageSize: number) {}
}
