import { MutateResultFactory } from '@/common/builders/mutate-result.builder';
import { Env } from '@/common/config/env';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { normalizeString } from '@repo/utils';
import { Cache } from 'cache-manager';
import { SessionData } from 'express-session';
import { EmailService } from '../email/email.service';
import { TokenService } from '../token/token.service';
import { UserBuilder } from '../user/builders/user.builder';
import { UserEntity } from '../user/entities/user.entity';
import { UserMapper } from '../user/mappers/user.mapper';
import { UserService } from '../user/user.service';
import {
  MAX_RESET_PASSWORD_ATTEMPTS,
  MAX_RESET_PASSWORD_ATTEMPTS_TIME,
} from './auth.constant';
import { CredentialsLoginErrorBuilder } from './builders/credentials-login-error.builder';
import { CredentialsSignUpErrorBuilder } from './builders/credentials-signup-error.builder';
import { SendResetPasswordEmailErrorBuilder } from './builders/send-reset-password-email-error.builder';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CheckResetPasswordTokenDto } from './dto/check-reset-password-token.dto';
import { CredentialsLoginDto } from './dto/credentials-login.dto';
import { CredentialsSignUpDto } from './dto/credentials-signup.dto';
import { SendEmailResetPasswordLinkDto } from './dto/send-email-reset-password-link.dto';
import { AuthProvider, OAuthUser } from './interface/auth.interface';
import { CredentialsLoginModel } from './models/credentials-login.model';
import { CredentialsSignUpModel } from './models/credentials-signup.model';
import { SendResetPasswordEmailModel } from './models/send-reset-password-email.model';
import { passwordCompare, passwordHash } from './utils/password-hash';
@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  /*handle oauth callback this used directly in the provider strategy*/
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
  /* handle credentials login */
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
      return MutateResultFactory.err({
        user: null,
        errors: errors.build(),
      });
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
    return MutateResultFactory.ok({
      user:UserMapper.toModel(user),
    });
  }
  /* handle credentials signup */
  async handleCredentialsSignUp(
    dto: CredentialsSignUpDto,
    session: SessionData
  ): Promise<CredentialsSignUpModel> {
    try {
      const errors = new CredentialsSignUpErrorBuilder();
      const userExists = await this.userService.findByEmail({
        email: normalizeString(dto.email),
      });
      const SIGNUP_DELAY = {
        MIN: 100,
        MAX: 4000,
      };
      /* if user exists */
      if (userExists) {
        const randomDelay = Math.floor(
          Math.random() * (SIGNUP_DELAY.MAX - SIGNUP_DELAY.MIN) +
            SIGNUP_DELAY.MIN
        );
        await new Promise((resolve) => setTimeout(resolve, randomDelay));
        errors.setUserExsitsError();
        return MutateResultFactory.err({
          user: null,
          errors: errors.build(),
        });
      }
      const hashedPassword = await passwordHash(dto.password);
      const user = new UserBuilder()
        .setEmail(dto.email)
        .setName(dto.name)
        .setPassword(hashedPassword)
        .build();

      const sessionData = {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
        rules: [],
        permissions: [],
        planId: '',
      };
      this.saveSession(session, sessionData);
      const newUser = await this.userService.create(user);
      return MutateResultFactory.ok({
        user: UserMapper.toModel(newUser),
      });
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        'Something went wrong, please try again later.'
      );
    }
  }
  /*handle send reset password link */
  async handleSendResetPasswordLink({
    email,
  }: SendEmailResetPasswordLinkDto): Promise<SendResetPasswordEmailModel> {
    try {
      const normalizedEmail = normalizeString(email);
      const cacheKey = `reset-password-attempts:${normalizedEmail}`;

      const errors = new SendResetPasswordEmailErrorBuilder();
      let attempts = await this.cacheManager.get<number>(cacheKey);
      if (!attempts) {
        attempts = 0;
      }
      if (attempts >= MAX_RESET_PASSWORD_ATTEMPTS) {
        errors.setMaxResetAttemptsExceededError();
        return MutateResultFactory.err({
          success: false,
          errors: errors.build(),
        });
      }
      await this.cacheManager.set(
        cacheKey,
        attempts + 1,
        MAX_RESET_PASSWORD_ATTEMPTS_TIME
      );

      const user = await this.userService.findByEmail({
        email: normalizedEmail,
      });
      if (!user) {
        errors.setEmailNotFoundError();
        return MutateResultFactory.err({
          success: false,
          errors: errors.build(),
        });
      }
      const token = await this.tokenService.userResetPasswordToken.generate(
        user.id
      );
      await this.emailService.sendResetPasswordEmail({
        email: normalizedEmail,
        url: `${this.configService.get<Env['PUBLIC_BASE_APP_ORIGIN']>(
          'PUBLIC_BASE_APP_ORIGIN'
        )}/auth/reset-password?token=${token}`,
      });
      return MutateResultFactory.ok({
        success: true,
      });
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        'Something went wrong, please try again later.'
      );
    }
  }
  /*handle check reset password token */
  async handleCheckResetPasswordToken({
    token,
  }: CheckResetPasswordTokenDto): Promise<boolean> {
    return await this.tokenService.userResetPasswordToken.validate(token);
  }
  /* handle change passowrd */
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
