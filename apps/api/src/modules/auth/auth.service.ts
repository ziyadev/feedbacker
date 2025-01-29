import { Env } from '@/common/config/env';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { normalizeString } from '@repo/utils';
import { Cache } from 'cache-manager';
import { SessionData } from 'express-session';
import { EmailService } from '../email/email.service';
import { TokenService } from '../token/token.service';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import {
  MAX_RESET_PASSWORD_ATTEMPTS,
  MAX_RESET_PASSWORD_ATTEMPTS_TIME,
} from './auth.constant';
import { CredentialsLoginErrorBuilder } from './builders/credentials-login-error.builder';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CheckResetPasswordTokenDto } from './dto/check-reset-password-token.dto';
import { CredentialsLoginDto } from './dto/credentials-login.dto';
import { CredentialsSignUpDto } from './dto/credentials-signup.dto';
import { SendEmailLoginLinkDto } from './dto/send-email-login-link.dto';
import { SendEmailResetPasswordLinkDto } from './dto/send-email-reset-password-link.dto';
import { AuthProvider, OAuthUser } from './interface/auth.interface';
import { CredentialsLoginModel } from './models/credentials-login.model';
import { passwordCompare, passwordHash } from './utils/password-hash';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async handleOAuthCallback(dto: OAuthUser): Promise<
    UserEntity & {
      isNew: boolean;
      provider: AuthProvider;
    }
  > {
    const normalizedEmail = normalizeString(dto.email);
    // Check if user exists
    const user = await this.userService.findByEmail({
      email: normalizedEmail,
    });
    if (!user) {
      // Create a new user if not found
      const newUser = await this.userService.createWithProvider({
        email: dto.email,
        name: dto.name,
        avatar: dto.avatar_url,
        provider: dto.provider,
        providerAccountId: dto.providerAccountId,
        emailVerified: true,
      });
      return {
        ...newUser,
        isNew: true,
        provider: dto.provider,
      };
    }
    return {
      ...user,
      isNew: false,
      provider: dto.provider,
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
      const token = await this.tokenService.userLoginToken.generate(
        normalizedEmail
      );
      return await this.emailService.sendLoginEmail({
        email: normalizedEmail,
        url: `${this.configService.get<Env['PUBLIC_BASE_APP_ORIGIN']>(
          'PUBLIC_BASE_APP_ORIGIN'
        )}/auth/email-sign-in?token=${token}`,
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
  async handleCredentialsLogin(
    dto: CredentialsLoginDto,
    session: SessionData
  ): Promise<CredentialsLoginModel> {
    const errors = new CredentialsLoginErrorBuilder();
    const normalizedEmail = normalizeString(dto.email);

    const LOGIN_DELAY = {
      MIN: 100,
      MAX: 2000,
    };

    const simulateLoginDelay = async () => {
      const randomDelay = Math.floor(
        Math.random() * (LOGIN_DELAY.MAX - LOGIN_DELAY.MIN) + LOGIN_DELAY.MIN
      );
      await new Promise((resolve) => setTimeout(resolve, randomDelay));
    };
    const handleInvalidCredentials = async () => {
      await simulateLoginDelay();
      errors.setInvalidCredentialsError();
      return {
        user: null,
        errors: errors.build(),
      };
    };
    const user = await this.userService.findByEmail({ email: normalizedEmail });

    /* if user not found or no password */
    if (!user?.hashedPassword) {
      return handleInvalidCredentials();
    }

    const isPasswordValid = await passwordCompare(
      dto.password,
      user.hashedPassword
    );

    /* if password not valid */
    if (!isPasswordValid) {
      return handleInvalidCredentials();
    }

    const sessionData = {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      rules: [],
      permissions: [],
      planId: '',
    };

    this.saveSession(session, sessionData);

    return {
      user,
      errors: errors.build(),
    };
  }
  async handleCredentialsSignUp(
    dto: CredentialsSignUpDto
  ): Promise<UserEntity> {
    const userExists = await this.userService.findByEmail({
      email: normalizeString(dto.email),
    });
    if (userExists) {
      const maxWaitTime = 2000;
      const minWaitTime = 90;
      const randomWaitTime = Math.floor(
        Math.random() * (maxWaitTime - minWaitTime) + minWaitTime
      );
      await new Promise((resolve) => {
        setTimeout(resolve, randomWaitTime);
      });
      throw new ForbiddenException('User with this email already exists');
    }
    const hashedPassword = await passwordHash(dto.password);

    const user = await this.userService.create({
      email: dto.email,
      name: dto.name,
      emailVerified: false,
      hashedPassword,
    });

    return user;
  }
  async handleSendResetPasswordLink({
    email,
  }: SendEmailResetPasswordLinkDto): Promise<boolean> {
    try {
      const normalizedEmail = normalizeString(email);
      const userAttempts =
        (await this.cacheManager.get<number>(normalizedEmail)) ?? 0;

      if (userAttempts >= MAX_RESET_PASSWORD_ATTEMPTS) {
        throw new ForbiddenException(
          'You have reached the maximum number of reset password attempts'
        );
      }

      const ttl = await this.cacheManager.ttl(normalizedEmail);
      await this.cacheManager.set(
        normalizedEmail,
        userAttempts + 1, // Increment user attempts
        ttl ?? MAX_RESET_PASSWORD_ATTEMPTS_TIME
      );

      const user = await this.userService.findByEmail({
        email: normalizedEmail,
      });
      if (!user) return true;

      const token = await this.tokenService.userResetPasswordToken.generate(
        user.id
      );
      return this.emailService.sendResetPasswordEmail({
        email: normalizedEmail,
        url: `${this.configService.get<Env['PUBLIC_BASE_APP_ORIGIN']>(
          'PUBLIC_BASE_APP_ORIGIN'
        )}/auth/reset-password?token=${token}`,
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
  async handleCheckResetPasswordToken({
    token,
  }: CheckResetPasswordTokenDto): Promise<boolean> {
    return await this.tokenService.userResetPasswordToken.validate(token);
  }
  async handlechangePassword(dto: ChangePasswordDto): Promise<boolean> {
    const userId = await this.tokenService.getIdentifierByToken(dto.token);
    if (!userId) return false;
    const user = await this.userService.findById({ id: userId });
    if (!user) return false;
    const hashedPassword = await passwordHash(dto.newPassword);
    await this.userService.update(userId, {
      hashedPassword,
    });
    return true;
  }
  saveSession(session: SessionData, user: SessionData['user']) {
    session.user = {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      rules: [],
      permissions: [],
      planId: '',
    };
  }
}
