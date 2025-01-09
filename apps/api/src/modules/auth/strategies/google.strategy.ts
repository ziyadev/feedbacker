import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { Env } from '@/common/config/env';
import { AuthService } from '../auth.service';

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

      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    const user = await this.authService.handleProviderLogin({
      name: profile.displayName,
      email: profile.emails[0].value,
      emailVerified: profile.emails[0].verified,
      avatar: profile.photos[0].value,
      provider: profile.provider,
      providerAccountId: profile.id,
    });

    done(null, user);
  }
}
