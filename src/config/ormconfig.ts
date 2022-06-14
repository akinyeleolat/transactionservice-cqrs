import { DataSource } from 'typeorm';
import { environmentVariables } from './env-config';
const isDev = process.env.NODE_ENV === 'development';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  name: 'default',
  entities: ['src/entities/*{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  subscribers: ['src/subscriber/*{.ts,.js}'],
  type: 'postgres',
  host: environmentVariables.db.host,
  port: environmentVariables.db.port,
  username: environmentVariables.db.username,
  password: environmentVariables.db.password,
  database: environmentVariables.db.name,
  synchronize: isDev,
  logging: isDev,
});
