import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { appConfig } from './common/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await appConfig(app);
}

bootstrap();
