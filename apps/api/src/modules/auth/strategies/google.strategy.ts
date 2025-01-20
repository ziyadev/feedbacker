import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { Env } from '@/common/config/env';
import { AuthService } from '../auth.service';
import { OAuathUserCallbackDto } from '../dto/oauth-user-callback.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      clientID: configService.get<Env['GOOGLE_CLIENT_ID']>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<Env['GOOGLE_CLIENT_SECRET']>(
        'GOOGLE_CLIENT_SECRET'
      ),
      pkce: true,
      state: true,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
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
