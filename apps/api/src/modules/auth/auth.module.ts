import { Env } from '@/common/config/env';
import { TokenModule } from '@/modules/token/token.module';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { OauthMiddleware } from './middleware/oauth.middleware';
import { GithubStrategy } from './strategies/github.stategy';
import { GoogleStrategy } from './strategies/google.strategy';
import {
    SessionStrategy,
} from './strategies/session.strategy';
import {
    WorkspaceStrategy,
} from './strategies/workspace.strategy';

@Module({
  imports: [
    PassportModule,
    TokenModule,
    UserModule,
    CacheModule.register(),
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
    HeaderAPIKeyStrategy,
    AuthResolver,
    SessionStrategy,
    WorkspaceStrategy,
  ],
  exports: [SessionStrategy, WorkspaceStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OauthMiddleware).forRoutes('auth/google', 'auth/github');
  }
}
