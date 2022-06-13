import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transaction } from './entities/transaction';
import { environmentVariables } from './config/env-config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environmentVariables.db.host,
      port: environmentVariables.db.port,
      username: environmentVariables.db.username,
      password: environmentVariables.db.password,
      database: environmentVariables.db.name,
      entities: [Transaction],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
