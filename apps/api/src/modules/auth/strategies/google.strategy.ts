import { Env } from '@/common/config/env';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { OAuathUserCallbackDto } from '../dto/oauth-user-callback.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<Env['GOOGLE_CLIENT_ID']>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<Env['GOOGLE_CLIENT_SECRET']>(
        'GOOGLE_CLIENT_SECRET'
      ),
      pkce: true,
      state: true,
      callbackURL: `${configService.get<Env['PUBLIC_BASE_APP_URL']>(
        'PUBLIC_BASE_APP_URL'
      )}/auth/google/callback`,
      scope: ['profile', 'email'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    const user = {
      name: profile.displayName,
      email: profile.emails[0].value,
      emailVerified: profile.emails[0].verified,
      avatar: profile.photos[0].value,
      provider: profile.provider,
      providerAccountId: profile.id,
    } satisfies OAuathUserCallbackDto;
    if (!user) throw new InternalServerErrorException();

    done(null, user);
  }
}
