import { UserSessionData } from '@/common/config/sessoin.config';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SendEmailLoginLinkDto } from './dto/send-email-login-link.dto';
import { UserModel } from '../user/models/user.model';
import { EmailService } from '../email/email.service';
import { TokenService } from '../token/token.service';
import { ConfigService } from '@nestjs/config';
import { normalizeString } from '@repo/utils';
import { Env } from '@/common/config/env';
import { UserEntity } from '../user/entities/user.entity';
import { OAuthUser } from './interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService
  ) {}

  async handleOAuthCallback(dto: OAuthUser): Promise<
    UserEntity & {
      isNew: boolean;
    }
  > {
    const normalizedEmail = normalizeString(dto.email);
    // Check if user exists
    const user = await this.userService.findByEmail({
      email: normalizedEmail,
    });
    // Create a new user if not found
    if (user) {
      return {
        ...user,
        isNew: false,
      };
    }

    return {
      ...(await this.userService.createWithProvider({
        email: dto.email,
        name: dto.name,
        avatar: dto.avatar_url,
        provider: dto.provider,
        providerAccountId: dto.providerAccountId,
        emailVerified: true,
      })),
      isNew: true,
    };
  }

  async handleSendLoginLink({
    email,
  }: SendEmailLoginLinkDto): Promise<boolean> {
    try {
      const normalizedEmail = normalizeString(email);
      const user = await this.userService.findByEmail({
        email: normalizedEmail,
      });
      if (!user) {
        throw new NotFoundException('User with this email not found');
      }
      // Generate token
      const token = await this.tokenService.userLoginToken.generate({
        email: normalizedEmail,
      });
      return await this.emailService.sendLoginEmail({
        email: normalizedEmail,
        url: `${this.configService.get<Env['PUBLIC_BASE_FRONT_URL']>(
          'PUBLIC_BASE_FRONT_URL'
        )}/auth/email-login?token=${token}`,
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
