import { Module, Global } from '@nestjs/common';
import { EmailService } from './email.service';
import { ResendModule } from 'nestjs-resend';
import { ConfigService } from '@nestjs/config';
import { Env } from '@/common/config/env';

@Global()
@Module({
  imports: [
    ResendModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get<Env['RESEND_API_KEY']>('RESEND_API_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
