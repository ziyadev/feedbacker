import { Session } from '@/common/decorators/session.decorator';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SessionData } from 'express-session';
import { UserMapper } from '../user/mappers/user.mapper';
import { UserModel } from '../user/models/user.model';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CheckResetPasswordTokenDto } from './dto/check-reset-password-token.dto';
import { CredentialsLoginDto } from './dto/credentials-login.dto';
import { CredentialsSignUpDto } from './dto/credentials-signup.dto';
import { SendEmailResetPasswordLinkDto } from './dto/send-email-reset-password-link.dto';
import { CredentialsLoginModel } from './models/credentials-login.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => CredentialsLoginModel)
  async credentialLogin(
    @Args('input') input: CredentialsLoginDto,
    @Session() session: SessionData
  ): Promise<CredentialsLoginModel> {
    return this.authService.handleCredentialsLogin(input, session);
  }
  @Mutation(() => UserModel)
  async credentialSignUp(
    @Args('input') input: CredentialsSignUpDto,
    @Session() session: SessionData
  ) {
    const user = await this.authService.handleCredentialsSignUp(input);
    this.authService.saveSession(session, user);

    return UserMapper.toModel(user);
  }
  @Mutation(() => Boolean)
  async sendResetPasswordLink(
    @Args('input') input: SendEmailResetPasswordLinkDto
  ) {
    return await this.authService.handleSendResetPasswordLink(input);
  }
  @Mutation(() => Boolean)
  checkResetPasswordToken(@Args('input') input: CheckResetPasswordTokenDto) {
    return this.authService.handleCheckResetPasswordToken(input);
  }

  @Mutation(() => Boolean)
  changePassword(@Args('input') input: ChangePasswordDto) {
    return this.authService.handlechangePassword(input);
  }
}
