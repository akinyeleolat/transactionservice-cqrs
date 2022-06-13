// load all env
import * as env from 'env-var';
import { config } from 'dotenv';

config();

export const environmentVariables = {
  db: {
    host: env.get('DB_HOST').asString(),
    port: env.get('DB_PORT').asInt(),
    username: env.get('DB_USERNAME').asString(),
    password: env.get('DB_PASSWORD').asString(),
    name: env.get('DB_NAME').asString(),
  },
};
