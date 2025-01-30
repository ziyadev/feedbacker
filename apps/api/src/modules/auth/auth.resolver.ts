import { Session } from '@/common/decorators/session.decorator';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SessionData } from 'express-session';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CheckResetPasswordTokenDto } from './dto/check-reset-password-token.dto';
import { CredentialsLoginDto } from './dto/credentials-login.dto';
import { CredentialsSignUpDto } from './dto/credentials-signup.dto';
import { SendEmailResetPasswordLinkDto } from './dto/send-email-reset-password-link.dto';
import { CredentialsLoginModel } from './models/credentials-login.model';
import { CredentialsSignUpModel } from './models/credentials-signup.model';
import { SendResetPasswordEmailModel } from './models/send-reset-password-email.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => CredentialsLoginModel, {
    description:
      'Authenticates a user with credentials and returns user information',
  })
  async credentialsLogin(
    @Args('input') input: CredentialsLoginDto,
    @Session() session: SessionData
  ): Promise<CredentialsLoginModel> {
    return this.authService.handleCredentialsLogin(input, session);
  }

  @Mutation(() => CredentialsSignUpModel, {
    description:
      'Creates a new user account with the provided credentials and returns user information',
  })
  async credentialsSignUp(
    @Args('input') input: CredentialsSignUpDto,
    @Session() session: SessionData
  ): Promise<CredentialsSignUpModel> {
    return this.authService.handleCredentialsSignUp(input, session);
  }

  @Mutation(() => SendResetPasswordEmailModel, {
    description: 'Sends a password reset link to the provided email address',
  })
  async sendResetPasswordLink(
    @Args('input') input: SendEmailResetPasswordLinkDto
  ): Promise<SendResetPasswordEmailModel> {
    return this.authService.handleSendResetPasswordLink(input);
  }

  @Mutation(() => Boolean, {
    description: 'Validates if a password reset token is valid and not expired',
  })
  checkResetPasswordToken(@Args('input') input: CheckResetPasswordTokenDto) {
    return this.authService.handleCheckResetPasswordToken(input);
  }

  @Mutation(() => Boolean, {
    description: 'Changes user password using a valid reset token',
  })
  changePassword(@Args('input') input: ChangePasswordDto) {
    return this.authService.handlechangePassword(input);
  }
}
