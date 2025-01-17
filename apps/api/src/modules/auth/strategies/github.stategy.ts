import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, StrategyOption } from 'passport-github2';
import { Env } from '@/common/config/env';
import { AuthService } from '../auth.service';
import { OAuathUserCallbackDto } from '../dto/oauth-user-callback.dto';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(GithubStrategy.name);
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      clientID: configService.get<Env['GITHUB_CLIENT_ID']>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<Env['GITHUB_CLIENT_SECRET']>(
        'GITHUB_CLIENT_SECRET'
      ),
      callbackURL: 'http://localhost:3000/api/auth/github/callback',
      scope: ['user'],
    } satisfies StrategyOption);
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any
  ) {
    const user = {
      name: profile.username,
      email: profile.emails[0].value,
      emailVerified: true,
      avatar: profile.photos[0].value,
      provider: profile.provider,
      providerAccountId: profile.id,
    } satisfies OAuathUserCallbackDto;
    if (!user) throw new InternalServerErrorException();

    done(null, user);
  }
}
