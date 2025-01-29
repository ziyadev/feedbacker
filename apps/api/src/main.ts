import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { appConfig } from './common/config/app.config';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  await appConfig(app);
}

bootstrap();
