import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environmentVariables } from './config/env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(environmentVariables.port || 3000);
}
bootstrap();
