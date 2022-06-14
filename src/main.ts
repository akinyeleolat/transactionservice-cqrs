import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { environmentVariables } from './config/env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (environmentVariables.env !== 'Production') {
    const config = new DocumentBuilder()
      .setTitle('Transaction Servcie')
      .setDescription('Transaction API Servcie Implementation')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  await app.listen(environmentVariables.port || 3000);
}

bootstrap().then(() => {
  console.log(`
--------------------------------------
Application Started
API V1: http://localhost:${environmentVariables.port}
API DOC: http://localhost:${environmentVariables.port}/docs
--------------------------------------`);
});
