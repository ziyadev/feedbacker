import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { AppModule } from './app/app.module';
import { sessionConfig } from './common/config/sessoin.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(session(sessionConfig), cookieParser());
  app.enableCors({
    origin: ['http://localhost:4000', 'http://app.localhost.com'],
    credentials: true,
  });
  const port = process.env.PORT || 3852;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
