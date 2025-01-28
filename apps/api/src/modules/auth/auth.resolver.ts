import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SendEmailLoginLinkDto } from './dto/send-email-login-link.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async emailLogin(@Args('input') input: SendEmailLoginLinkDto) {
    return this.authService.handleSendLoginLink(input);
  }
}
