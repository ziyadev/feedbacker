import { UserSessionData } from '@/common/config/sessoin.config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { OAuathUserCallbackDto } from './dto/oauth-user-callback.dto';
import createRedirectUrl from './utils/create-redirect-url';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async handleOAuthCallback(
    dto: OAuathUserCallbackDto,
    redirectUri?: string
  ): Promise<{
    sessionData: UserSessionData | null;
    redirectUrl: string;
  }> {
    try {
      // Check if user exists
      let user = await this.userService.findByAccountProviderId({
        providerAccountId: dto.providerAccountId,
      });
      // Create a new user if not found
      if (!user) {
        user = await this.userService.createWithProvider(dto);
      }
      const sessionData = {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
        rules: [],
        permissions: [],
        planId: '',
      };

      const redirectUrl =
        redirectUri ||
        createRedirectUrl({
          status: 'success',
          provider: dto.provider,
        });

      return { sessionData, redirectUrl };
    } catch (e) {
      const redirectUrl = createRedirectUrl({
        status: 'error',
        provider: dto.provider,
        error_message: e.message || 'Something went wrong',
      });
      return { sessionData: null, redirectUrl };
    }
  }

  async generateRefreshToken(userId: string) {
    const user = await this.userService.findById({
      id: userId,
    });
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }
}
