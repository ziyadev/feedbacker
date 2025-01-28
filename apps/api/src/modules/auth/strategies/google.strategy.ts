import { Env } from '@/common/config/env';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { AuthProvider } from '../interface/auth.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
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

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    const user = await this.authService.handleOAuthCallback({
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar_url: profile.photos[0].value,
      provider: AuthProvider.GOOGLE,
      providerAccountId: profile.id,
    });
    done(null, user);
  }
}
