import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transaction } from './entities/transaction';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 55000,
      username: 'postgres',
      password: 'postgrespw',
      database: 'transaction_service',
      entities: [Transaction],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
