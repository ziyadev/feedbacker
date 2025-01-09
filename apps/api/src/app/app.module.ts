import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { CompositeAuthAPIStrategy } from '../modules/auth/strategies/composite-api.strategy';
import { envValidation } from '@/common/config/env';
import { DatabaseModule } from '@/modules/database/database.module';
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validate: envValidation,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: CompositeAuthAPIStrategy,
    },
  ],
})
export class AppModule {}
