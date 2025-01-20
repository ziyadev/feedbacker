import { Env } from '@/common/config/env';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OauthMiddleware } from './middleware/oauth.middleware';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { GithubStrategy } from './strategies/github.stategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserSessionStrategy } from './strategies/user-session.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<Env['JWT_SECRET']>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    GithubStrategy,
    UserSessionStrategy,
    ApiKeyStrategy,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OauthMiddleware).forRoutes('auth/google', 'auth/github');
  }
}
