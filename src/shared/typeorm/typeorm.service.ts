import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { environmentVariables } from '../../config/env-config';
const isDev = process.env.NODE_ENV === 'development';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      migrationsTableName: 'migrations',
      name: 'default',
      entities: ['dist/entities/*{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      subscribers: ['dist/subscriber/*{.ts,.js}'],
      type: 'postgres',
      host: environmentVariables.db.host,
      port: environmentVariables.db.port,
      username: environmentVariables.db.username,
      password: environmentVariables.db.password,
      database: environmentVariables.db.name,
      synchronize: isDev,
      logging: isDev,
    };
  }
}
