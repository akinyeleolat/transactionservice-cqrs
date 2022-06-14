// load all env
import * as env from 'env-var';
import { config } from 'dotenv';

config();

export const environmentVariables = {
  port: env.get('APP_PORT').asInt(),
  rate: {
    ServiceUrl: env.get('RATE_SERVICE_URL').asString(),
    ApiKey: env.get('RATE_SERVICE_API_KEY').asString(),
  },
  db: {
    host: env.get('DB_HOST').asString(),
    port: env.get('DB_PORT').asInt(),
    username: env.get('DB_USERNAME').asString(),
    password: env.get('DB_PASSWORD').asString(),
    name: env.get('DB_NAME').asString(),
  },
};
